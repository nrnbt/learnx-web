import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@mui/material'
import { theme } from '@/themes/mui-theme'
import { FunctionComponent, PropsWithChildren } from 'react'
import { AuthProvider } from '@/providers/auth'
import { SnackbarProvider } from '@/providers/toaster'
import { NotifProvider } from '@/providers/notif'
import cn from 'classnames'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LearnX',
  description: 'Learning Management Platform by DX Mongolia'
}

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='16' />
      </head>
      <body className={cn(inter.className, 'min-h-screen')}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <SnackbarProvider>
              <NotifProvider>
                {children}
              </NotifProvider>
            </SnackbarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
