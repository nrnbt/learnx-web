'use client'

import { isNOU } from '@/utils/null-check'
import axios from 'axios'
import { FunctionComponent, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from '../auth'
import { useSnackbar } from '../toaster'
import { Notification, NotificationContext } from './types'

const notificationContext = createContext<NotificationContext>({
  notifications: [],
  clear: function (): void {
    throw new Error('Function not implemented.')
  },
  markAllAsRead: function (): void {
    throw new Error('Function not implemented.')
  },
  markAsRead: function (notifId: number): void {
    throw new Error('Function not implemented.')
  },
  unreadCount: 0,
  isLoading: false
})

export const NotifProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[] | undefined>([])
  const [unreadCount, setUnreadCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  const { showSnackbar } = useSnackbar()
  const { credentialsRaw, loaded, isLoggedIn } = useAuthContext()

  const fetchNotif = async (): Promise<void> => {
    await axios.get('/api/notif', {
      headers: {
        Cookie: JSON.stringify(credentialsRaw)
      },
      withCredentials: true
    })
      .then((res) => {
        if (!isNOU(res.data?.results)) {
          setNotifications(res.data?.results)
        } else {
          console.error('Notifications not found!')
          showSnackbar('Notifications not found!', 'error')
        }
      })
      .catch((e) => {
        console.error(e)
        showSnackbar(e.msg, 'error')
      })
  }

  const fetchNotifUnseenCount = async (): Promise<void> => {
    await axios.get('/api/notif/unseenCount')
      .then((res) => {
        if (!isNOU(res.data?.count)) {
          setUnreadCount(res.data.count)
        } else {
          console.error('Notification unread count not found!')
          showSnackbar('Notifications unread count found!', 'error')
        }
      })
      .catch((e) => {
        console.error(e)
        showSnackbar(e.msg, 'error')
      })
  }

  useEffect(() => {
    if (loaded && isLoggedIn) {
      setIsLoading(true)
      fetchNotif()
        .catch(console.error)
      fetchNotifUnseenCount()
        .catch(console.error)
      setIsLoading(false)
    }
  }, [loaded, isLoggedIn])

  const clear = (): void => {

  }

  const markAsRead = (notifId: number): void => {

  }

  const markAllAsRead = (): void => {

  }

  return (
    <notificationContext.Provider value={{ clear, markAllAsRead, markAsRead, notifications, unreadCount, isLoading }}>
      {children}
    </notificationContext.Provider>
  )
}

export const useNotifContext = (): NotificationContext => {
  return useContext(notificationContext)
}
