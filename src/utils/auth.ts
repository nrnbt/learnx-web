import { NextAuthOptions, User, getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

import axios from 'axios'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import apiClient from './api-client'
import { isNOU } from './null-check'
import { EdxUserInfo, OpenEdxCredentials } from '@/providers/auth/types'
import { replaceAllSlash } from './json-data-cleaner'
import { encryptData } from './crypro'

interface TokenRes {
  csrfToken: string
}

declare module 'next-auth' {
  interface Session {
    user: {
      credentials: OpenEdxCredentials
      cookies: string[]
    } & User
  }

  interface User {
    credentials: OpenEdxCredentials
    cookies: string[]
  }
}

const ssoAuthentication = async (email: string): Promise<User> => {
  const existingUser = await apiClient.get<Array<{ email: string }>>(`/user/v1/accounts/?email=${email ?? ''}`)

  if (isNOU(existingUser.data[0].email)) {
    const formData = new FormData()

    formData.append('username', email.split('@')[0])
    formData.append('password', encryptData(email))
    formData.append('email', email)
    formData.append('name', email.split('@')[0])

    const registerResponse = await apiClient.post('/user/v2/account/registration/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Referer: 'https://www.learnx.mn'
      }
    })

    if (registerResponse.status !== 201) {
      throw new Error('Failed to register user with Open edX.')
    }
  }
  const user = await openEdxLoginData({ email: existingUser.data[0].email, password: encryptData(existingUser.data[0].email) })
  return user
}

const openEdxLoginData = async (credentials: { email: string, password: string }): Promise<User> => {
  const formData = new FormData()

  formData.append('email_or_username', credentials.email)
  formData.append('password', credentials.password)

  const formDataObject: any = {}
  formData.forEach((value, key) => {
    formDataObject[key] = value
  })

  const urlEncodedData = new URLSearchParams(formDataObject).toString()

  const mainPageResponse = await axios.get<TokenRes>(process.env.LEARNX_OPEN_EDX_CSRF_TOKEN_URL ?? 'https://lms.learnx.mn/csrf/api/v1/token')
  const csrfToken = mainPageResponse.data.csrfToken

  const response = await apiClient.post(
    '/user/v2/account/login_session/',
    urlEncodedData,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': csrfToken,
        Cookie: `csrftoken=${csrfToken ?? ''}`,
        Referer: process.env.LEARNX_OPEN_EDX_URL ?? 'https://lms.learnx.mn',
        Origin: process.env.LEARNX_OPEN_EDX_URL ?? 'https://lms.learnx.mn'
      }
    }
  )

  if (!isNOU(response) && !isNOU(response?.data?.success) && response.data.success === true) {
    const cookies = response.headers['set-cookie'] ?? []

    const credentials: any = {}

    cookies.forEach((cookie) => {
      const cookieParts = cookie.split(';')[0]
      const [key, value] = cookieParts.split('=')
      credentials[key] = value
    })

    let edxUserInfo: EdxUserInfo = {
      email: '',
      header_urls: {
        logout: '',
        account_settings: '',
        learner_profile: ''
      },
      user_image_urls: {
        full: '',
        large: '',
        medium: '',
        small: ''
      },
      username: '',
      version: 0
    }
    const edxUserInfoRaw: string = replaceAllSlash(credentials['edx-user-info'])

    if (edxUserInfoRaw.startsWith('"') && edxUserInfoRaw.endsWith('"')) {
      edxUserInfo = JSON.parse(`${edxUserInfoRaw.slice(1, -1)}`) as EdxUserInfo
    }

    const credData: OpenEdxCredentials = {
      csrfToken: credentials.csrftoken,
      edxUserInfo,
      edxJwtCookieHeaderPayload:
        credentials['edx-jwt-cookie-header-payload'],
      edxJwtCookieSignature:
        credentials['edx-jwt-cookie-signature'],
      edxLoggedIn: JSON.parse(credentials.edxloggedin),
      openedxLanguagePreference:
        credentials['openedx-language-preference'],
      sessionId: credentials.sessionid
    }

    const user: User = {
      id: edxUserInfo.email,
      email: edxUserInfo.email,
      name: edxUserInfo.username,
      image: edxUserInfo.user_image_urls.medium,
      credentials: credData,
      cookies
    }

    return user
  } else {
    throw new Error('Failed to login!')
  }
}

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {
        if (isNOU(credentials)) {
          throw new Error('Missing credentials')
        }
        try {
          const user = await openEdxLoginData(credentials)
          return user
        } catch (error: any) {
          throw new Error(
            error?.response?.data?.value ?? (error ?? 'Error occurred')
          )
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    })
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async signIn ({ user, account, profile, email, credentials }) {
      try {
        if (!isNOU(user) && !isNOU(user.email)) {
          const data = await ssoAuthentication(user.email)
          if (isNOU(data)) {
            throw new Error('Failed to authenticate user.')
          }
          return !isNOU(data)
        } else {
          throw new Error('Failed to authenticate user.')
        }
      } catch (error: any) {
        console.error('Error during sign-in:', error?.response)
        return false
      }
    },
    async jwt ({ token, user }) {
      if (!isNOU(user)) {
        token.user = user
      }

      return token
    },
    async session ({ session, token, user }) {
      if (!isNOU(token.user)) {
        session.user = token.user as { credentials: OpenEdxCredentials, cookies: string[] } & User
      }
      return session
    }
  }
}

export const loginIsRequiredServer = async (): Promise<void> => {
  const session = await getServerSession(authConfig)
  if (session == null) return redirect('/login')
}

export const loginIsRequiredClient = (): void => {
  if (typeof window !== 'undefined') {
    const session = useSession()
    if (!isNOU(session)) {
      window.open('/login', '_self')
    }
  }
}
