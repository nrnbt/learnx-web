export interface Notification {
  id: number
  appName: string
  notificationType: string
  content: string
  contentContext: any
  contentUrl: string
  lastRead: Date
  lastSeen: Date
  created: Date
}

export interface NotificationContext {
  notifications?: Notification[]
  clear: () => void
  markAllAsRead: () => void
  markAsRead: (notifId: number) => void
  unreadCount: number
  isLoading: boolean
}
