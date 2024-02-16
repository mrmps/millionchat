import { auth } from '@/auth'
import { LoginButton } from '@/components/login-button'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export default async function SignInPage() {
  const session = await auth()
  // redirect to home if user is already logged in
  if (session?.user) {
    redirect('/')
  }

  return (
    // <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
    //   <LoginButton />
    // </div>
    <div className="w-full m-auto overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
        <a href="https://rizzsearch.com">
          <Image
            src="/logo.png"
            alt="Logo"
            className="size-10 rounded-full"
            width={20}
            height={20}
          />
        </a>
        <h3 className="font-display text-2xl font-bold">Sign In</h3>
        <p className="text-sm text-gray-500">
          Sign in for unlimited access, hundreds of chats/searches per day free,
          and access from any device.
        </p>
      </div>

      <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
        <LoginButton />
        <p className="mt-3 text-center text-xs text-gray-400 sm:text-left">
        By continuing you agree to our{' '}
        <a
          className="text-gray-500 hover:text-gray-900 underline underline-offset-2 transition-colors duration-200 ease-out"
          target="_blank"
          href="https://rizzsearch.com/privacy"
        >
          Privacy Policy
        </a>{' '}
        and{' '}
        <a
          className="text-gray-500 hover:text-gray-900 underline underline-offset-2 transition-colors duration-200 ease-out"
          target="_blank"
          href="https://rizzsearch.com/terms"
        >
          Terms of Use
        </a>
      </p>
      </div>
     
    </div>
  )
}
