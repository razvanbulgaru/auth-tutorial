import { Section, Link, Row, Column, Text, Img } from '@react-email/components';
import * as React from 'react';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

const Footer = () => {
	return (
		<Section className="mt-10 bg-slate-200 rounded-lg pt-5 px-3 mx-auto">
			<Row className="w-11/12">
				<Column>
					<Link
						href="tel:+40755611102"
						className="text-black"
						target="_blank"
					>
						<Row>
							<Column>
								<Img
									src={`${baseUrl}/static/phone.png`}
									width="18"
									height="18"
									alt="Phone"
									className="mr-1"
								/>
							</Column>
							<Column>
								<span>0755611102</span>
							</Column>
						</Row>
					</Link>
				</Column>
				<Column>
					<Link
						href="mailto:office@motohai.ro"
						className="text-black w-1/2"
						target="_blank"
					>
						<Row>
							<Column>
								<Img
									src={`${baseUrl}/static/mail.png`}
									width="18"
									height="18"
									alt="Phone"
									className="mr-1"
								/>
							</Column>
							<Column>
								<span>office@motohai.ro</span>
							</Column>
						</Row>
					</Link>
				</Column>
			</Row>
			<div className="bg-slate-400 h-[0.05rem] rounded-full my-3" />
			<Row className="w-1/3 text-center">
				<Column>
					<Link
						href="https://www.facebook.com/motohaifb"
						className="text-black"
						target="_blank"
					>
						<Img
							src={`${baseUrl}/static/facebook.png`}
							width="30"
							height="30"
							alt="Facebook"
						/>
					</Link>
				</Column>
				<Column>
					<Link
						href="https://www.instagram.com/motohai.ro/"
						className="text-black"
						target="_blank"
					>
						<Img
							src={`${baseUrl}/static/instagram.png`}
							width="30"
							height="30"
							alt="Instagram"
						/>
					</Link>
				</Column>
				<Column>
					<Link
						href="https://wa.me/40755611102"
						className="text-black"
						target="_blank"
					>
						<Img
							src={`${baseUrl}/static/message-circle.png`}
							width="30"
							height="30"
							alt="Whatsapp"
						/>
					</Link>
				</Column>
			</Row>
			<Text className="text-xs font-extralight text-center text-black">
				&copy; {new Date().getFullYear()} COANTAVENTURA S.R.L.
			</Text>
		</Section>
	);
};

export default Footer;
