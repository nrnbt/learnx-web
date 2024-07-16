export interface EdxUserInfo {
  email: string
  header_urls: {
    logout: string
    account_settings: string
    learner_profile: string
  }
  user_image_urls: {
    full: string
    large: string
    medium: string
    small: string
  }
  username: string
  version: number
}

export interface OpenEdxCredentials {
  csrfToken: string
  edxUserInfo: EdxUserInfo
  edxJwtCookieHeaderPayload: string
  edxJwtCookieSignature: string
  edxLoggedIn: boolean
  openedxLanguagePreference: string
  sessionId: string
}

export interface OpenEdxCredentialsRaw {
  csrf_token: string
  edx_user_info: EdxUserInfo
  edx_jwt_cookie_header_payload: string
  edx_jwt_cookie_signature: string
  edx_logged_in: boolean
  openedx_language_preference: string
  sessionid: string
}

export interface AuthContext {
  login: (cred: OpenEdxCredentials, credRaw: OpenEdxCredentialsRaw) => Promise<void>
  logout: () => Promise<void>
  isLoggedIn: boolean
  credentials?: OpenEdxCredentials | null
  credentialsRaw?: OpenEdxCredentialsRaw | null
  loaded: boolean
}

export interface UserData {
  userName: string
  passWord: string
}
