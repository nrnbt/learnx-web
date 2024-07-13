'use client'

import { useAuthContext } from '@/providers/auth'
import { useRouter } from 'next/navigation'
import { FunctionComponent, PropsWithChildren, useEffect } from 'react'

const StudentAuthLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { isLoggedIn, loaded } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (loaded && !isLoggedIn) {
      router.push('/login')
    }
  }, [loaded, isLoggedIn])

  return (
    <div className='flex h-full w-full justify-center items-center'>
      {children}
    </div>
  )
}

export default StudentAuthLayout
