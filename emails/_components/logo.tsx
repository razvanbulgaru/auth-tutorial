import { Img, Section } from '@react-email/components';
import * as React from 'react';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

const Logo = () => {
	return (
		<Section className="mt-8">
			<Img
				src={`${baseUrl}/static/moto-hai.png`}
				width="150"
				height="150"
				alt="Moto Hai"
				className="my-0 mx-auto rounded-full shadow-md"
			/>
		</Section>
	);
};

export default Logo;
