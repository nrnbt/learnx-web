import { useNotifContext } from '@/providers/notif'
import { theme } from '@/themes/mui-theme'
import { isNOU } from '@/utils/null-check'
import CheckIcon from '@mui/icons-material/Check'
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Alert, Badge, Box, Button, Fade, FormControlLabel, FormGroup, IconButton, Popper, Stack, Switch, Typography } from '@mui/material'
import { ChangeEvent, FunctionComponent, MouseEvent, useState } from 'react'

const NotifCenter: FunctionComponent = () => {
  const {
    notifications,
    clear,
    markAllAsRead,
    markAsRead,
    unreadCount
  } = useNotifContext()
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const toggleNotificationCenter = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
    setIsOpen(!isOpen)
  }

  const toggleFilter = (e: ChangeEvent): void => {
    setShowUnreadOnly(!showUnreadOnly)
  }

  return (
    <div>
      <IconButton
        onClick={(event) => toggleNotificationCenter(event)}
        aria-haspopup='true'
        sx={{ color: 'black' }}
      >
        <Badge badgeContent={4} color='secondary'>
          <NotificationsIcon style={{ color: 'white' }} />
        </Badge>
      </IconButton>
      <Popper
        open={isOpen}
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                borderWidth: '2px',
                borderColor: 'white',
                borderRadius: '20px',
                marginRight: '20px',
                marginTop: '10px',
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                elevation: 0,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 85,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                  clipPath: 'polygon(0 0, 100% 0, 0 100%)'
                }
              }}
            >
              <Box
                sx={{
                  background: theme.palette.primary.main,
                  padding: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px'
                }}
              >
                <Typography variant='h6' color='#fff'>
                  Notification center
                </Typography>
                <FormGroup sx={{ color: '#fff' }}>
                  <FormControlLabel
                    control={
                      <Switch
                        color='secondary'
                        onChange={toggleFilter}
                        checked={showUnreadOnly}
                      />
                    }
                    label='Show unread only'
                  />
                </FormGroup>
              </Box>
              <Stack
                sx={{
                  height: '300px',
                  width: 'min(50ch, 90ch)',
                  padding: '12px',
                  background: '#f1f1f1',
                  overflowY: 'auto'
                }}
                spacing={2}
              >
                {(isNOU(notifications) ||
                  (unreadCount === 0 && showUnreadOnly)) && (
                    <h4>
                      Your queue is empty! you are all set{' '}
                      <span role='img' aria-label='dunno what to put'>
                        🎉
                      </span>
                    </h4>
                )}
                {(showUnreadOnly
                  ? (notifications ?? []).filter((v) => v.notificationType === 'unread')
                  : notifications ?? []
                ).map((notification, idx) => {
                  return (
                    <Alert
                      key={idx}
                      severity='info'
                      action={
                        notification.notificationType === 'read'
                          ? (
                            <CheckIcon />
                            )
                          : (
                            <IconButton
                              color='primary'
                              aria-label='upload picture'
                              component='span'
                              onClick={() => markAsRead(notification.id)}
                            >
                              <MarkChatReadIcon />
                            </IconButton>
                            )
                      }
                    >
                      {notification.content}
                    </Alert>
                  )
                })}
              </Stack>
              <Box
                sx={{
                  background: theme.palette.primary.main,
                  padding: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottomLeftRadius: '20px',
                  borderBottomRightRadius: '20px'
                }}
              >
                <Button variant='outlined' color='secondary' size='small' onClick={clear}>
                  Clear All
                </Button>

                <Button variant='contained' color='secondary' size='small' onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  )
}

export default NotifCenter
