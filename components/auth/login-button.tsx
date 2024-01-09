'use client';

import { useRouter } from 'next/navigation';

interface LogintButtonProps {
	children: React.ReactNode;
	mode?: 'modal' | 'redirect';
	asChild?: boolean;
}

export const LogintButton = ({
	children,
	mode = 'redirect',
	asChild,
}: LogintButtonProps) => {
	const router = useRouter();

	const onClick = () => {
		router.push('/auth/login');
	};

	if (mode === 'modal') {
		return <span>TODO: Implement login modal</span>;
	}

	return (
		<span onClick={onClick} className="cursor-pointer">
			{children}
		</span>
	);
};
