'use client'

import { useAuthContext } from '@/providers/auth'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useEffect } from 'react'

const LogoutPage: FunctionComponent = () => {
  const { logout } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    logout()
      .catch(console.error)
      .finally(() => {
        router.push('/')
      })
  }, [])

  return null
}

export default LogoutPage
