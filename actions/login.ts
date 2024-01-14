'use server';
import * as z from 'zod';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import { LoginSchema } from '@/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { getUserByEmail } from '@/data/user';
import {
	generateVerificationToken,
	generateTwoFactorToken,
} from '@/lib/tokens';
import { sendVerificationEmail, sendTwoFactorEmail } from '@/lib/mail';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';

import { db } from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';

export const login = async (
	values: z.infer<typeof LoginSchema>,
	callbackUrl?: string | null
) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Câmpuri invalide!' };
	}

	const { email, password, code } = validatedFields.data;

	const existingUser = await getUserByEmail(email);
	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Credențiale invalide!' };
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email
		);

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);

		return { success: 'Email de confirmare trimis!' };
	}

	if (existingUser.isTwoFactorEnabled) {
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(
				existingUser.email
			);

			if (!twoFactorToken) {
				return { error: 'Cod invalid!' };
			}

			if (twoFactorToken.token !== code) {
				return { error: 'Cod invalid!' };
			}

			const hasExpired = new Date(twoFactorToken.expires) < new Date();
			if (hasExpired) {
				return { error: 'Codul a expirat!' };
			}

			await db.twoFactorToken.delete({
				where: { id: twoFactorToken.id },
			});

			const existingConfirmation = await getTwoFactorConfirmationByUserId(
				existingUser.id
			);

			if (existingConfirmation) {
				await db.twoFactorConfirmation.delete({
					where: { id: existingConfirmation.id },
				});
			}

			await db.twoFactorConfirmation.create({
				data: { userId: existingUser.id },
			});
		} else {
			const twoFactorToken = await generateTwoFactorToken(
				existingUser.email
			);
			await sendTwoFactorEmail(
				twoFactorToken.email,
				twoFactorToken.token
			);

			return { twoFactor: true };
		}
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Credențiale invalide!' };
				default:
					return { error: 'Ceva nu a funcționat cum trebuie!' };
			}
		}

		throw error;
	}

	return { success: 'Te-ai logat cu succes!' };
};
