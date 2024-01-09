import { Poppins } from 'next/font/google';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { LogintButton } from '@/components/auth/login-button';

const font = Poppins({ subsets: ['latin'], weight: ['600'] });

export default function Home() {
	return (
		<main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
			<div className="space-y-6 text-center">
				<h1
					className={cn(
						'text-6xl font-semibold text-white drop-shadow-md',
						font.className
					)}
				>
					🔐 Auth
				</h1>
				<p className="text-lg text-white">
					A simple authentication service
				</p>
				<div>
					<LogintButton>
						<Button size={'lg'} variant={'secondary'}>
							Sign in
						</Button>
					</LogintButton>
				</div>
			</div>
		</main>
	);
}
