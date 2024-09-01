import { isNOU } from '@/utils/null-check'
import { Box, Button, Stack } from '@mui/material'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import NotifCenter from './NotifCenter'
import ProfileMenu from './ProfileMenu'

const NavigationItems: FunctionComponent = () => {
  const { data, status } = useSession()

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {!isNOU(data?.user.credentials) && status === 'authenticated'
        ? (
          <Stack direction='row' alignItems='center' spacing={{ xs: 0.5, sm: 1.5 }} sx={{ color: 'black' }}>
            <NotifCenter />
            <ProfileMenu session={data} />
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
