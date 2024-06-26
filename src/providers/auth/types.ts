export interface AuthContext {
  login: (token: string) => Promise<void>
  logout: () => Promise<void>
  isLoggedIn: boolean
  user?: User | null
  loaded: boolean
}

export interface User {
  userId: string
  email: string
  lastName: string
  firstName: string
  phone: string
}

export interface UserData {
  userName: string
  passWord: string
}