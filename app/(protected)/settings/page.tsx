import { LogoutButton } from '@/components/auth/logout-button';
import { Button } from '@/components/ui/button';

const SettingsPage = () => {
	return (
		<div>
			<LogoutButton>
				<Button variant={'destructive'}>Sign out</Button>
			</LogoutButton>
		</div>
	);
};

export default SettingsPage;
