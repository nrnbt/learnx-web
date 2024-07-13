'use client'

import { useAuthContext } from '@/providers/auth'
import { CircularProgress } from '@mui/material'
import { FunctionComponent } from 'react'

const DashboardPage: FunctionComponent = () => {
  const { credentials, loaded } = useAuthContext()

  if (!loaded) {
    return <CircularProgress size={50} />
  }

  return (
    <div>
      {credentials?.edxUserInfo.email}
    </div>
  )
}

export default DashboardPage
