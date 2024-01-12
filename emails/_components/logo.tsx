import { Img, Section } from '@react-email/components';
import * as React from 'react';

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: '';

const Logo = () => {
	return (
		<Section className="mt-8">
			<Img
				src={`${baseUrl}/static/moto-hai.svg`}
				width="150"
				height="150"
				alt="Moto Hai"
				className="my-0 mx-auto rounded-full shadow-md"
			/>
		</Section>
	);
};

export default Logo;
