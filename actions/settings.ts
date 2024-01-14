'use server';
import * as z from 'zod';

import bcrypt from 'bcryptjs';

import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { SettingsSchema } from '@/schemas';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
	const user = await currentUser();
	if (!user) return { error: 'Acces neautorizat' };

	const dbUser = await getUserById(user.id);
	if (!dbUser) return { error: 'Acces neautorizat' };

	if (user.isOAuth) {
		values.password = undefined;
		values.newPassword = undefined;
		values.isTwoFactorEnabled = undefined;
	}

	if (values.password && values.newPassword && dbUser.password) {
		const passwordsMatch = await bcrypt.compare(
			values.password,
			dbUser.password
		);

		if (!passwordsMatch) {
			return { error: 'Parolă incorectă!' };
		}

		const hashedPassword = await bcrypt.hash(values.newPassword, 10);

		values.password = hashedPassword;
		values.newPassword = undefined;
	}

	await db.user.update({ where: { id: user.id }, data: { ...values } });

	return { success: 'Setările au fost schimbate!' };
};
