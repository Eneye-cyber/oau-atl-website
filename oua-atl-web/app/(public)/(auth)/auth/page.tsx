import { buttonVariants} from '@/components/ui/button';
import Link from 'next/link'
import { redirect } from 'next/navigation';

const baseUrl = process.env.API_BASE;
async function verifyUser(verificationId: string, userId: string) {
  console.log(baseUrl, 'baseUrlbaseUrlbaseUrl')
  const response = await fetch(`${baseUrl}/verify?verification_id=${verificationId}&user_id=${userId}`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error('Verification failed');
  }

  const result = await response.json().catch(() => ({message: response.statusText}))

  console.log('verification response ; ', result)

  return true;
}

export default async function VerificationPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const verificationId = searchParams.verification_id;
  const userId = searchParams.user_id;

  if (!verificationId || !userId || Array.isArray(verificationId) || Array.isArray(userId)) {
    redirect('/');
  }

  try {
    const result = await verifyUser(verificationId, userId);
    return (
      <section className='h-96 flex items-center justify-center'>
        <div className="container mx-auto p-4 text-center">
          <h1 className="text-2xl font-semibold leading-none tracking-tight mb-4">Verification Successful</h1>
          <p className='text-muted-foreground'>Your account has been verified.</p>

          <Link className={`${buttonVariants({ size: 'lg', variant: 'outline' })} mt-4`} href={'/members/login'}>Proceed To Login</Link>
          
        </div>
      </section>
    );
  } catch (error) {
    return (
      <section className='h-96 flex items-center justify-center'>

        <div className="container mx-auto p-4 text-center">
          <h1 className="text-2xl font-semibold leading-none tracking-tight mb-4">Verification Failed</h1>
          <p className='text-muted-foreground'>There was an error verifying your account. Please try again.</p>
        </div>
      </section>
    );
  }
}

