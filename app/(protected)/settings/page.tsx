import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

const SettingsPage = async () => {
	const session = await auth();

	return (
		<div>
			{JSON.stringify(session)}
			<form
				action={async () => {
					'use server';
					await signOut();
				}}
			>
				<Button
					variant={'destructive'}
					type="submit"
					className="mx-3 my-5"
				>
					Sign out
				</Button>
			</form>
		</div>
	);
};

export default SettingsPage;
