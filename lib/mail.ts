import { Resend } from 'resend';

import TwoFactorEmail from '@/emails/two-factor-email';
import VerificationEmail from '@/emails/verification-email';
import PasswordResetEmail from '@/emails/password-reset-email';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${domain}/auth/new-verification?token=${token}`;

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Confirmare adresă de email',
		react: VerificationEmail({ confirmLink }),
	});
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetLink = `${domain}/auth/new-password?token=${token}`;

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Resetare parolă',
		react: PasswordResetEmail({ resetLink }),
	});
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Cod de autentificare',
		react: TwoFactorEmail({
			name: 'Razvan Bulgaru',
			validationCode: token,
		}),
	});
};
