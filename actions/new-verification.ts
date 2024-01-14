'use server';

import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';
import { db } from '@/lib/db';

export const newVerification = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);

	if (!existingToken) {
		return { error: 'Codul de verificare nu există!' };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) {
		return { error: 'Codul de verificare a expirat!' };
	}

	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) {
		return { error: 'Email inexistent!' };
	}

	await db.user.update({
		where: { id: existingUser.id },
		data: { emailVerified: new Date(), email: existingUser.email },
	});

	await db.verificationToken.delete({ where: { id: existingToken.id } });

	return { success: 'Adresa de email a fost verificată!' };
};
