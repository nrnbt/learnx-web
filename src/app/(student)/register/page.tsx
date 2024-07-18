'use client'

import RegisterForm from '@/components/forms/RegisterForm'
import { useAuthContext } from '@/providers/auth'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useEffect } from 'react'

const RegisterPage: FunctionComponent = () => {
  const { loaded, isLoggedIn } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (loaded && isLoggedIn) {
      router.push('/dashboard')
    }
  }, [loaded, isLoggedIn])

  return (
    <div className='w-full flex justify-center'>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
