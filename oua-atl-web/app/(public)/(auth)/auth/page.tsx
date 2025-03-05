'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

export default function VerificationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const verificationId = searchParams.get('verification_id');
  const userId = searchParams.get('user_id');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!verificationId || !userId) {
      router.replace('/');
      return;
    }

    const verifyUser = async () => {
      try {
        console.log(baseUrl, 'API Base URL');
        const response = await fetch(
          `${baseUrl}/verify?verification_id=${verificationId}&user_id=${userId}`,
          { method: 'GET', cache: 'no-store' }
        );

        if (!response.ok) throw new Error('Verification failed');

        const result = await response.json().catch(() => ({ message: response.statusText }));
        console.log('Verification response:', result);

        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };

    verifyUser();
  }, [verificationId, userId, router]);

  if (status === 'loading') {
    return (
      <section className='h-96 flex items-center justify-center'>
        <p className='text-muted-foreground'>Verifying your account...</p>
      </section>
    );
  }

  return (
    <section className='h-96 flex items-center justify-center'>
      <div className='container mx-auto p-4 text-center'>
        {status === 'success' ? (
          <>
            <h1 className='text-2xl font-semibold leading-none tracking-tight mb-4'>
              Verification Successful
            </h1>
            <p className='text-muted-foreground'>Your account has been verified.</p>
            <Link className={`${buttonVariants({ size: 'lg', variant: 'outline' })} mt-4`} href={'/members/login'}>
              Proceed To Login
            </Link>
          </>
        ) : (
          <>
            <h1 className='text-2xl font-semibold leading-none tracking-tight mb-4'>
              Verification Failed
            </h1>
            <p className='text-muted-foreground'>There was an error verifying your account. Please try again.</p>
          </>
        )}
      </div>
    </section>
  );
}
