'use client'

import jwt from "jsonwebtoken"
import { FunctionComponent, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { AuthContext, User } from './types'

const authContext = createContext<AuthContext>({
  isLoggedIn: false,
  loaded: false,
  login: async () => {
    throw new Error('login not implemented')
  },
  logout: () => {
    throw new Error('logout not implemented')
  }})

export const AuthProvider: FunctionComponent<PropsWithChildren>  = ({ children }) => {
  const [user, setUser] = useState<User | undefined | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsLoggedIn(true)
    }
    setLoaded(true)
  }, [])

  const login = async(token: string): Promise<void> => {
    const user = jwt.decode(token)
    if(user !== undefined) {
      setUser(user as User)
      localStorage.setItem('user', JSON.stringify(user))
      setIsLoggedIn(true)
    } else {
      console.error('user undefined')
    }
  }

  const logout = async(): Promise<void> => {
    localStorage.removeItem('user')
    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    <authContext.Provider value={{ loaded, user, isLoggedIn, login, logout }}>
      {children}
    </authContext.Provider>
  )
}

export const useAuthContext = (): AuthContext => {
  return useContext(authContext)
}
