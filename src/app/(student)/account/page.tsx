
import { authConfig, loginIsRequiredServer } from '@/utils/auth'
import { FunctionComponent } from 'react'

import Account from '@/components/Account'
import { getServerSession } from 'next-auth'

const AccountPage: FunctionComponent = async () => {
  await loginIsRequiredServer()

  const session = await getServerSession(authConfig)

  console.log(session)

  return (
    <Account />
  )
}

export default AccountPage
