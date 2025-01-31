'use client'

import MenuIcon from '@mui/icons-material/Menu'
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FunctionComponent, useState } from 'react'
import NavigationItems from './NavItems'
import CopyRight from './CopyRight'
import { SessionProvider } from 'next-auth/react'

interface NavPage {
  name: string
  link: string
}

const pages: NavPage[] = [
  { name: 'Home', link: '/' },
  { name: 'Courses', link: '/courses' },
  { name: 'About Us', link: '/about' }
]

const StudentAppBar: FunctionComponent = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false)

  const pathname = usePathname()

  return (
    <AppBar position='static' className='h-full'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters className='flex justify-between'>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            <img
              src='/LearnX-logo.png'
              alt='LearnX logo'
              className='h-full object-contain'
            />
          </Typography>

          <Box
            sx={{
              flex: 1,
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'start'
              }}
            >
              <IconButton
                size='large'
                aria-haspopup='true'
                onClick={(e) => setMobileDrawerOpen(!mobileDrawerOpen)}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Drawer
              open={mobileDrawerOpen}
              onClose={() => setMobileDrawerOpen(false)}
            >
              <Box sx={{ width: 250 }} role='presentation'>
                <List>
                  {pages.map((page, idx) => (
                    <ListItem key={idx} disablePadding>
                      <ListItemButton>
                        <Link
                          href={page.link}
                          onClick={() => setMobileDrawerOpen(false)}
                        >
                          <ListItemText primary={page.name} />
                        </Link>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  <ListItem>
                    <ListItemButton>
                      <Link href='/login'>Login</Link>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>
                      <Link href='/register'>Register</Link>
                    </ListItemButton>
                  </ListItem>
                </List>
                <CopyRight className='text-black text-sm p-4' />
              </Box>
            </Drawer>
          </Box>

          <Typography
            variant='h5'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            <img
              src='/LearnX-logo.png'
              alt='LearnX logo'
              className='h-full object-contain'
            />
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              width: '100%',
              justifyContent: 'center'
            }}
          >
            {pages.map((page, idx) => (
              <Button
                key={idx}
                className='relative my-4 text-white block text-md'
                variant='text'
              >
                <Link href={page.link}>
                  <div
                    className={cn(
                      'absolute top-0 bottom-0 right-0 left-0',
                      pathname === page.link &&
                        'border-b border-secondary transition-all duration-300 ease-in'
                    )}
                  />
                  <div className='text-white'>{page.name}</div>
                </Link>
              </Button>
            ))}
          </Box>
          <SessionProvider>
            <NavigationItems />
          </SessionProvider>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default StudentAppBar
