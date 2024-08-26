import { authConfig } from '@/utils/auth'
import { isNOU } from '@/utils/null-check'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { FunctionComponent, PropsWithChildren } from 'react'

const StudentAuthLayout: FunctionComponent<PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession(authConfig)

  if (isNOU(session) || isNOU(session.user.cookies) || isNOU(session.user.cookies)) {
    redirect('/login')
  }

  return (
    <div className='flex h-full w-full justify-center items-center'>
      {children}
    </div>
  )
}

export default StudentAuthLayout
