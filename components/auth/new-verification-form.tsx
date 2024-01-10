'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import CardWrapper from '@/components/auth/card-wrapper';

import { DotLoader } from 'react-spinners';
import { newVerification } from '@/actions/new-verification';
import FormError from '../form-error';
import FormSuccess from '../form-success';

const NewVerificationForm = () => {
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const onSubmit = useCallback(() => {
		if (success || error) return;
		if (!token) {
			setError('Missing token!');
			return;
		}

		newVerification(token)
			.then((data) => {
				setError(data.error);
				setSuccess(data.success);
			})
			.catch(() => {
				setError('Something went wrong!');
			});
	}, [token, success, error]);

	useEffect(() => {
		onSubmit();
	}, []);

	return (
		<CardWrapper
			headerLabel="Confirming your verification"
			backButtonHref="/auth/login"
			backButtonLable="Back to login"
		>
			<div className="flex items-center w-full justify-center">
				{!success && !error && <DotLoader color="#87CEEB" />}
				<FormError message={error} />
				{!success && <FormSuccess message={success} />}
			</div>
		</CardWrapper>
	);
};

export default NewVerificationForm;
