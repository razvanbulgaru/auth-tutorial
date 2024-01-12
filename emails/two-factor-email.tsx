import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Tailwind,
	Text,
} from '@react-email/components';

import * as React from 'react';
import Footer from './_components/footer';
import Logo from './_components/logo';

interface TwoFactorEmailProps {
	name: string;
	validationCode: string;
}
const TwoFactorEmail = ({ name, validationCode }: TwoFactorEmailProps) => {
	return (
		<Html>
			<Head />
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans">
					<Container className="border border-solid rounded-md my-10 mx-auto p-5 w-96 bg-slate-50">
						<Logo />
						<Heading className="text-black text-2xl font-semibold text-center my-8">
							Cod de autentificare
						</Heading>
						<Text className="text-black text-lg">
							Salutare {name ? name : 'Razvan Bulgaru'},
						</Text>
						<Text className="text-black text-lg">
							Codul tău este:
						</Text>
						<Text className="text-3xl text-white font-semibold text-center tracking-[1rem] p-3 bg-slate-500 rounded-lg">
							{validationCode || '123456'}
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

export default TwoFactorEmail;
