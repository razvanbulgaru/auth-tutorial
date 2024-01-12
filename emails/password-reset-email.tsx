import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Tailwind,
	Text,
} from '@react-email/components';

import * as React from 'react';
import Footer from './_components/footer';
import Logo from './_components/logo';

interface PasswordResetEmailProps {
	resetLink: string;
}
const PasswordResetEmail = ({ resetLink }: PasswordResetEmailProps) => {
	return (
		<Html>
			<Head />
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans">
					<Container className="border border-solid rounded-md my-10 mx-auto p-5 w-96 bg-slate-50">
						<Logo />
						<Heading className="text-black text-2xl font-semibold text-center my-8">
							Resetare parolă
						</Heading>
						<Text className="text-black text-lg">Salutare,</Text>
						<Text className="text-black text-lg">
							Ne pare rău că ai uitat parola, dar nu îți face
							griji. Apasă <Link href={resetLink}>aici</Link>{' '}
							pentru a seta o nouă parolă. După ce ai setat o nouă
							parolă te rugăm să mergi la formularul de login
							pentru a te loga.
						</Text>
						<Text className="text-black text-lg">
							Spor la cumpărături!
						</Text>
						<Footer />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default PasswordResetEmail;
