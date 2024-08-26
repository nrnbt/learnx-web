import { NotifProvider } from '@/providers/notif'
import { SnackbarProvider } from '@/providers/toaster'
import { theme } from '@/themes/mui-theme'
import { ThemeProvider } from '@mui/material'
import cn from 'classnames'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { FunctionComponent, PropsWithChildren } from 'react'
import './globals.css'

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
      <body className={cn(inter.className)}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <NotifProvider>
              {children}
            </NotifProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
