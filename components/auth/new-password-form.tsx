'use client';

import * as z from 'zod';
import { useState, useTransition } from 'react';

import { useSearchParams } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { NewPasswordSchema } from '@/schemas';

import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import CardWrapper from '@/components/auth/card-wrapper';

import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';

import { newPassword } from '@/actions/new-password';

export const NewPasswordForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			newPassword(values, token).then((data) => {
				setError(data.error);
				setSuccess(data.success);
			});
		});
	};

	return (
		<CardWrapper
			headerLabel="Introdu o nouă parolă"
			backButtonLable="Înapoi la login"
			backButtonHref="/auth/login"
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Parolă</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="******"
											type="password"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button
						type="submit"
						className="w-full"
						disabled={isPending}
					>
						Setează parola
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
