import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const LoginSchema = z.object({
	email: z.string().email({ message: 'Email-ul este necesar' }),
	password: z.string().min(1, { message: 'Parola este necesară' }),

	code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
	email: z.string().email({ message: 'Email-ul este necesar' }),
	password: z
		.string()
		.min(6, { message: 'Parola trebuie sa aibă minim 6 caractere' }),
	name: z.string().min(1, { message: 'Numele este necesar' }),
});

export const ResetSchema = z.object({
	email: z.string().email({ message: 'Email-ul este necesar' }),
});

export const NewPasswordSchema = z.object({
	password: z
		.string()
		.min(6, { message: 'Parola trebuie sa aibă minim 6 caractere' }),
});

export const SettingsSchema = z
	.object({
		name: z.optional(z.string()),
		isTwoFactorEnabled: z.optional(z.boolean()),
		role: z.enum([UserRole.ADMIN, UserRole.USER]),
		password: z.optional(
			z
				.string()
				.min(6, { message: 'Parola trebuie sa aibă minim 6 caractere' })
		),
		newPassword: z.optional(
			z
				.string()
				.min(6, { message: 'Parola trebuie sa aibă minim 6 caractere' })
		),
	})
	.refine(
		(data) => {
			if (data.password && !data.newPassword) {
				return false;
			}

			return true;
		},
		{ message: 'Noua parolă este necesară!', path: ['newPassword'] }
	)
	.refine(
		(data) => {
			if (!data.password && data.newPassword) {
				return false;
			}

			return true;
		},
		{ message: 'Parola este necesară!', path: ['password'] }
	);
