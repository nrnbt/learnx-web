'use client'

import { useSnackbar } from '@/providers/toaster'
import { UserProfile } from '@/utils/data-types'
import { isNOU } from '@/utils/null-check'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'

const Account: FunctionComponent = () => {
  const [account, setAccount] = useState<UserProfile | undefined>()
  const [loading, setLoading] = useState(false)

  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    fetchUserAccount().catch(() => {})
  }, [])

  const fetchUserAccount = async (): Promise<void> => {
    setLoading(true)
    await axios.get('/api/account')
      .then((res) => {
        if (!isNOU(res.data.userProfile)) {
          setAccount(res.data.userProfile)
        } else {
          showSnackbar('User profile not found!', 'error')
        }
      })
      .catch((e: any) => {
        console.error(e)
        showSnackbar(e.data ?? e.data.message, 'error')
      })
      .finally(() => {
        setLoading(true)
      })
  }

  return (
    <div className='flex justify-center w-full h-full items-center'>
      {loading
        ? (
          <CircularProgress style={{ color: 'white' }} />
          )
        : (
          <div>
            <div>
              <span className='text-2xl font-bold text-white'>Account Settings</span>
            </div>
            <div>
              {!isNOU(account) && (
                <div>
                  {account.name}
                </div>
              )}
            </div>
          </div>
          )}
    </div>
  )
}

export default Account
