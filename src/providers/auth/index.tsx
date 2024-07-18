'use client'

import { replaceSlash } from '@/utils/json-data-cleaner'
import { isNOU } from '@/utils/null-check'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { FunctionComponent, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { AuthContext, OpenEdxCredentials } from './types'

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
  const [credentialsRaw, setCredentialsRaw] = useState<OpenEdxCredentials | undefined | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')

    const csrfToken = Cookies.get('csrftoken') ?? ''
    const edxJwtCookieHeaderPayload = Cookies.get('edx-jwt-cookie-header-payload') ?? ''
    const edxJwtCookieSignature = Cookies.get('edx-jwt-cookie-signature') ?? ''
    const edxUserInfo = Cookies.get('edx-user-info') ?? '{}'
    const edxLoggedIn = Cookies.get('edxloggedin') ?? 'false'
    const openedxLanguagePreference = Cookies.get('openedx-language-preference') ?? ''
    const sessionId = Cookies.get('sessionid') ?? ''

    if (!isNOU(storedUser)) {
      setCredentials(JSON.parse(storedUser))
      setCredentialsRaw({
        csrfToken,
        edxJwtCookieHeaderPayload,
        edxJwtCookieSignature,
        edxLoggedIn: JSON.parse(edxLoggedIn),
        edxUserInfo: JSON.parse(edxUserInfo),
        openedxLanguagePreference,
        sessionId
      })
      setIsLoggedIn(true)
    }
    setLoaded(true)
  }, [])

  const login = async (cred: OpenEdxCredentials, credRaw: any): Promise<void> => {
    if (!isNOU(cred) && !isNOU(credRaw)) {
      const edxUserInfo = replaceSlash(credRaw['edx-user-info'])
      localStorage.setItem('user', JSON.stringify(cred))
      Cookies.set('csrftoken', credRaw.csrftoken, { expires: 7 })
      Cookies.set('edx-jwt-cookie-header-payload', credRaw['edx-jwt-cookie-header-payload'], { expires: 7 })
      Cookies.set('edx-jwt-cookie-signature', credRaw['edx-jwt-cookie-signature'], { expires: 7 })
      Cookies.set('edx-user-info', edxUserInfo, { expires: 7 })
      Cookies.set('edxloggedin', credRaw.edxloggedin, { expires: 7 })
      Cookies.set('openedx-language-preference', credRaw['openedx-language-preference'], { expires: 7 })
      Cookies.set('sessionid', credRaw.sessionid, { expires: 7 })
      setIsLoggedIn(cred.edxLoggedIn)
      router.push('/dashboard')
    } else {
      console.error('user undefined')
    }
  }

  const logout = async (): Promise<void> => {
    localStorage.removeItem('user')
    Cookies.remove('csrftoken')
    Cookies.remove('edx-jwt-cookie-header-payload')
    Cookies.remove('edx-jwt-cookie-signature')
    Cookies.remove('edx-user-info')
    Cookies.remove('edxloggedin')
    Cookies.remove('openedx-language-preference')
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
