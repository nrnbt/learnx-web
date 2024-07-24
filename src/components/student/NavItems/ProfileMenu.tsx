import DashboardIcon from '@mui/icons-material/Dashboard'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import { Avatar, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'

interface ProfileMenuItem {
  href: string
  name: string
  icon: JSX.Element
}

const profileMenuItems: ProfileMenuItem[] = [
  {
    href: '/dashboard',
    name: 'Dashboard',
    icon: <DashboardIcon fontSize='small' />
  },
  {
    href: '/account',
    name: 'My Account',
    icon: <PersonIcon fontSize='small' />
  },
  {
    href: '/logout',
    name: 'Logout',
    icon: <LogoutIcon fontSize='small' />
  }
]

const ProfileMenu: FunctionComponent = () => {
  const [proMenuAnchorEl, setProMenuAnchorEl] = useState<HTMLButtonElement | null>(null)
  const profileMenuOpen = Boolean(proMenuAnchorEl)

  const handleProMenuClose = (): void => {
    setProMenuAnchorEl(null)
  }

  const profilePictureSrc = (): string => {
    return ''
  }

  return (
    <Stack direction='row' alignItems='center' spacing={{ xs: 0.5, sm: 1.5 }} sx={{ color: 'black' }}>
      <IconButton
        onClick={(event) => setProMenuAnchorEl(event.currentTarget)}
        aria-haspopup='true'
        sx={{ color: 'black' }}
      >
        <Avatar alt='Profile' src={profilePictureSrc()} />
      </IconButton>
      <Menu
        anchorEl={proMenuAnchorEl}
        open={profileMenuOpen}
        onClose={handleProMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 24,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuList>
          {profileMenuItems.map((item, idx) => {
            const { href, icon: MenuIcon, name } = item

            return (
              <Link href={href} key={idx}>
                <MenuItem onClick={handleProMenuClose}>
                  <ListItemIcon>
                    {MenuIcon}
                  </ListItemIcon>
                  <ListItemText>
                    <Link href={href}>
                      <Typography>{name}</Typography>
                    </Link>
                  </ListItemText>
                </MenuItem>
                {idx === profileMenuItems.length - 2 && <Divider />}
              </Link>
            )
          })}
        </MenuList>
      </Menu>
    </Stack>
  )
}

export default ProfileMenu
