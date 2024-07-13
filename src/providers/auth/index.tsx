'use client'

import { isNOU } from '@/utils/null-check'
import { FunctionComponent, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { AuthContext, OpenEdxCredentials } from './types'
import { useRouter } from 'next/navigation'

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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!isNOU(storedUser)) {
      setCredentials(JSON.parse(storedUser ?? ''))
      setIsLoggedIn(true)
    }
    setLoaded(true)
  }, [])

  const login = async (cred: OpenEdxCredentials): Promise<void> => {
    if (!isNOU(cred)) {
      localStorage.setItem('user', JSON.stringify(cred))
      setIsLoggedIn(cred.edxLoggedIn)
      router.push('/dashboard')
    } else {
      console.error('user undefined')
    }
  }

  const logout = async (): Promise<void> => {
    localStorage.removeItem('user')
    setCredentials(null)
    setIsLoggedIn(false)
  }

  return (
    <authContext.Provider value={{ loaded, credentials, isLoggedIn, login, logout }}>
      {children}
    </authContext.Provider>
  )
}

export const useAuthContext = (): AuthContext => {
  return useContext(authContext)
}
