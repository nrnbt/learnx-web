import LoginForm from '@/components/forms/LoginForm'
import { FunctionComponent } from 'react'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/utils/auth'
import { isNOU } from '@/utils/null-check'
import { redirect } from 'next/navigation'

const LoginPage: FunctionComponent = async () => {
  const session = await getServerSession(authConfig)

  if (!isNOU(session) && !isNOU(session.user.cookies) && session.user.cookies.length > 0) {
    redirect('/dashboard')
  }

  return (
    <div className='flex w-full'>
      <LoginForm />
    </div>
  )
}

export default LoginPage
