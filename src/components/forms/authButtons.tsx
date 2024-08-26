'use client'

import googleLogo from '../../../public/google.png'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export const GoogleSignInButton = (): JSX.Element => {
  const handleClick = (): void => {
    signIn('google').catch((e) => console.error(e))
  }

  return (
    <button
      onClick={handleClick}
      className='w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200'
    >
      <Image src={googleLogo} alt='Google Logo' width={20} height={20} />
      <span className='ml-4'>Continue with Google</span>
    </button>
  )
}

export const CredentialsSignInButton = (): JSX.Element => {
  const handleClick = (): void => {
    signIn().catch((e) => console.error(e))
  }

  return (
    <button
      onClick={handleClick}
      className='w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200'
    >
      <span className='ml-4'>Continue with Email</span>
    </button>
  )
}
