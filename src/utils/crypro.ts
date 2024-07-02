import CryptoJS from 'crypto-js'

const salt = process.env.NEXT_PUBLIC_SALT ?? ''

export const encryptData = (data: any): string => {
  const stringifiedData = JSON.stringify(data)
  const encryptedData = CryptoJS.AES.encrypt(stringifiedData, salt).toString()
  return encryptedData
}

export const decryptData = (data: string): any => {
  const bytes = CryptoJS.AES.decrypt(data, salt)
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
  return JSON.parse(decryptedData)
}
