import type { NextAuthConfig } from 'next-auth';

import bcrypt from 'bcryptjs';

import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { LoginSchema } from './schemas';
import { getUserByEmail } from './data/user';

export default {
	providers: [
		Google,
		GitHub,
		Credentials({
			async authorize(credentials) {
				const validateFields = LoginSchema.safeParse(credentials);

				if (validateFields.success) {
					const { email, password } = validateFields.data;

					const user = await getUserByEmail(email);

					if (!user || !user.password) return null;

					const passwordsMath = await bcrypt.compare(
						password,
						user.password
					);

					if (passwordsMath) return user;
				}

				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
