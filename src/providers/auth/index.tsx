'use client'

import { isNOU } from '@/utils/null-check'
import { FunctionComponent, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { AuthContext, OpenEdxCredentials, OpenEdxCredentialsRaw } from './types'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const authContext = createContext<AuthContext>({
  isLoggedIn: false,
  loaded: false,
  login: async () => {
    throw new Error('login not implemented')
  },
  logout: () => {
    throw new Error('logout not implemented')
  }
})

export const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [credentials, setCredentials] = useState<OpenEdxCredentials | undefined | null>(null)
  const [credentialsRaw, setCredentialsRaw] = useState<OpenEdxCredentialsRaw | undefined | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const storedUser = Cookies.get('user')

    const csrfToken = Cookies.get('csrf_token')
    const edxJwtCookieHeaderPayload = Cookies.get('edx_jwt_cookie_header_payload')
    const edxJwtCookieSignature = Cookies.get('edx_jwt_cookie_signature')
    const edxLoggedIn = Cookies.get('edx_logged_in')
    const edxUserInfo = Cookies.get('edx_user_info')
    const openedxLanguagePreference = Cookies.get('openedx_language_preference')
    const sessionId = Cookies.get('sessionid')

    if (!isNOU(storedUser)) {
      setCredentials(JSON.parse(storedUser ?? ''))
      setCredentialsRaw({
        csrf_token: csrfToken ?? '',
        edx_jwt_cookie_header_payload: edxJwtCookieHeaderPayload ?? '',
        edx_jwt_cookie_signature: edxJwtCookieSignature ?? '',
        edx_logged_in: JSON.parse(edxLoggedIn ?? '') ?? true,
        edx_user_info: JSON.parse(edxUserInfo ?? ''),
        openedx_language_preference: openedxLanguagePreference ?? '',
        sessionid: sessionId ?? ''
      })
      setIsLoggedIn(true)
    }
    setLoaded(true)
  }, [])

  const login = async (cred: OpenEdxCredentials, credRaw: any): Promise<void> => {
    if (!isNOU(cred) && !isNOU(credRaw)) {
      console.log(credRaw)
      Cookies.set('user', JSON.stringify(cred), { expires: 7 })
      Cookies.set('csrf_token', JSON.stringify(credRaw.csrftoken), { expires: 7 })
      Cookies.set('edx_jwt_cookie_header_payload', JSON.stringify(credRaw['edx-jwt-cookie-header-payload']), { expires: 7 })
      Cookies.set('edx_jwt_cookie_signature', JSON.stringify(credRaw['edx-jwt-cookie-signature']), { expires: 7 })
      Cookies.set('edx_logged_in', JSON.stringify(credRaw.edxloggedin), { expires: 7 })
      Cookies.set('edx_user_info', JSON.stringify(credRaw['edx-user-info']), { expires: 7 })
      Cookies.set('openedx_language_preference', JSON.stringify(credRaw['openedx-language-preference']), { expires: 7 })
      Cookies.set('sessionid', JSON.stringify(credRaw.sessionid), { expires: 7 })
      setIsLoggedIn(cred.edxLoggedIn)
      router.push('/dashboard')
    } else {
      console.error('user undefined')
    }
  }

  const logout = async (): Promise<void> => {
    Cookies.remove('user')
    Cookies.remove('csrf_token')
    Cookies.remove('edx_jwt_cookie_header_payload')
    Cookies.remove('edx_jwt_cookie_signature')
    Cookies.remove('edx_logged_in')
    Cookies.remove('edx_user_info')
    Cookies.remove('openedx_language_preference')
    Cookies.remove('sessionid')
    setCredentials(null)
    setCredentialsRaw(null)
    setIsLoggedIn(false)
  }

  return (
    <authContext.Provider value={{ loaded, credentials, credentialsRaw, isLoggedIn, login, logout }}>
      {children}
    </authContext.Provider>
  )
}

export const useAuthContext = (): AuthContext => {
  return useContext(authContext)
}
