'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useEffect } from 'react'

const LogoutPage: FunctionComponent = () => {
  const router = useRouter()

  useEffect(() => {
    signOut({ callbackUrl: '/' })
      .catch(console.error)
      .finally(() => {
        router.push('/')
      })
    // logout()
    //   .catch(console.error)
    //   .finally(() => {
    //     router.push('/')
    //   })
  }, [])

  return null
}

export default LogoutPage
