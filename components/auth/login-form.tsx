'use client';

import * as z from 'zod';
import { useState, useTransition } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginSchema } from '@/schemas';

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

import { login } from '@/actions/login';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export const LoginForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [showTwoFactor, setShowTwoFactor] = useState(false);

	const searchParams = useSearchParams();
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email already in use with different provider!'
			: '';
	const callbackUrl = searchParams.get('callbackUrl');

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			login(values, callbackUrl).then((data) => {
				if (data.error) {
					form.reset();
					setError(data.error);
				}

				if (data.success) {
					form.reset();
					setSuccess(data.error);
				}

				if (data.twoFactor) {
					setShowTwoFactor(true);
				}
			});
		});
	};

	return (
		<CardWrapper
			headerLabel="Bine ai revenit"
			backButtonLable="Nu ai cont?"
			backButtonHref="/auth/register"
			showSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4">
						{!showTwoFactor && (
							<>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="email@exemplu.com"
													type="email"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
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
											<Button
												size={'sm'}
												variant={'link'}
												asChild
												className="px-0 font-normal"
											>
												<Link href={'/auth/reset'}>
													Ai uitat parola?
												</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
						{showTwoFactor && (
							<FormField
								control={form.control}
								name="code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Cod de autentificare
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="123456"
												disabled={isPending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</div>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button
						type="submit"
						className="w-full"
						disabled={isPending}
					>
						{showTwoFactor ? 'Confirmă' : 'Intră în cont'}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
