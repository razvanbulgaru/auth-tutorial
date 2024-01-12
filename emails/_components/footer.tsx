import { Section, Link, Row, Column, Text } from '@react-email/components';

import * as React from 'react';

const Footer = () => {
	return (
		<Section className="mt-10 bg-slate-200 rounded-lg pt-5 px-3">
			<Row className="text-center">
				<Column>
					<Link
						href="tel:+40755611102"
						className="text-black"
						target="_blank"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="align-middle mr-1"
						>
							<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
						</svg>
						<span>0755611102</span>
					</Link>
				</Column>
				<Column>
					<Link
						href="mailto:office@motohai.ro"
						className="text-black"
						target="_blank"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="align-middle mr-1"
						>
							<rect width="20" height="16" x="2" y="4" rx="2" />
							<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
						</svg>
						<span>office@motohai.ro</span>
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="align-middle"
						>
							<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
						</svg>
					</Link>
				</Column>
				<Column>
					<Link
						href="https://www.instagram.com/motohai.ro/"
						className="text-black"
						target="_blank"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="align-middle"
						>
							<rect
								width="20"
								height="20"
								x="2"
								y="2"
								rx="5"
								ry="5"
							/>
							<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
							<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
						</svg>
					</Link>
				</Column>
				<Column>
					<Link
						href="https://wa.me/40755611102"
						className="text-black"
						target="_blank"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="align-middle"
						>
							<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
						</svg>
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
