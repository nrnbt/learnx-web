'use client'

import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FunctionComponent, useState } from 'react'
import NavigationItems from './NavItems'

interface NavPage {
  name: string
  link: string
}

const pages: NavPage[] = [
  { name: 'Home', link: '/' },
  { name: 'Courses', link: '/courses' },
  { name: 'About Us', link: '/about' },
  { name: 'Contact', link: '/contact' }
]

const StudentAppBar: FunctionComponent = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const pathname = usePathname()

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters className='flex justify-between'>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
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

          <Box sx={{ flex: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'start' }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={(e) => setAnchorElNav(e.currentTarget)}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page, idx) => (
                <MenuItem key={idx}>
                  <Link href={page.link}>
                    <Typography textAlign='center'>{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant='h5'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
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

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, width: '100%', justifyContent: 'center' }}>
            {pages.map((page, idx) => (
              <Button
                key={idx}
                className='relative my-4 text-white block text-md'
                variant='text'
              >
                <Link href={page.link}>
                  <div className={cn(
                    'absolute top-0 bottom-0 right-0 left-0',
                    pathname === page.link && 'border-b border-secondary transition-all duration-300 ease-in')}
                  />
                  <div className='text-white'>{page.name}</div>
                </Link>
              </Button>
            ))}
          </Box>

          <NavigationItems />

        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default StudentAppBar
