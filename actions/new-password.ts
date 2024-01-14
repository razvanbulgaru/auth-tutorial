'use server';
import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';

import { NewPasswordSchema } from '@/schemas';

import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';

export const newPassword = async (
	values: z.infer<typeof NewPasswordSchema>,
	token: string | null
) => {
	if (!token) {
		return { error: 'Lipsă token!' };
	}

	const validatedFields = NewPasswordSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Câmpuri invalide!' };
	}

	const { password } = validatedFields.data;

	const existingToken = await getPasswordResetTokenByToken(token);
	if (!existingToken) {
		return { error: 'Cod invalid!' };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) {
		return { error: 'Codul a expirat!' };
	}

	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) {
		return { error: 'Email inexistent!' };
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await db.user.update({
		where: { id: existingUser.id },
		data: { password: hashedPassword },
	});

	await db.passwordResetToken.delete({ where: { id: existingToken.id } });

	return { success: 'Parola a fost schimbată!' };
};
