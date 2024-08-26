import { authConfig } from '@/utils/auth'
import { isNOU } from '@/utils/null-check'
import { Box, Button, Stack } from '@mui/material'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import NotifCenter from './NotifCenter'
import ProfileMenu from './ProfileMenu'

const NavigationItems: FunctionComponent = async () => {
  const session = await getServerSession(authConfig)

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {!isNOU(session?.user.credentials)
        ? (
          <Stack direction='row' alignItems='center' spacing={{ xs: 0.5, sm: 1.5 }} sx={{ color: 'black' }}>
            <NotifCenter />
            <ProfileMenu session={session} />
          </Stack>
          )
        : (
          <div className='flex gap-2'>
            <Button
              variant='contained'
              color='secondary'
            >
              <Link href='/login'>
                Login
              </Link>
            </Button>
            <Button
              variant='outlined'
              color='secondary'
            >
              <Link href='/register'>
                Register
              </Link>
            </Button>
          </div>
          )}
    </Box>
  )
}

export default NavigationItems
