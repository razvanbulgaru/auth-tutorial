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

interface VerificationEmailProps {
	confirmLink: string;
}
const VerificationEmail = ({ confirmLink }: VerificationEmailProps) => {
	return (
		<Html>
			<Head />
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans">
					<Container className="border border-solid rounded-md my-10 mx-auto p-5 w-96 bg-slate-50">
						<Logo />
						<Heading className="text-black text-2xl font-semibold text-center my-8">
							Confirmare email
						</Heading>
						<Text className="text-black text-lg">
							Bine ai venit,
						</Text>
						<Text className="text-black text-lg">
							Ne bucurăm că ai ales magazinul nostru. Apasă{' '}
							<Link href={confirmLink}>aici</Link> pentru confirma
							adresa de email. După accesare te rugăm să mergi la
							formularul de login pentru a te loga.
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

export default VerificationEmail;
