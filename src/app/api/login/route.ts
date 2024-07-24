import apiClient from '@/utils/api-client'
import { decryptData } from '@/utils/crypro'
import { isNOU } from '@/utils/null-check'
import axios from 'axios'
import { NextResponse } from 'next/server'

interface TokenRes {
  csrfToken: string
}

export async function POST (request: Request): Promise<Response> {
  try {
    const bodyData = await request.json()

    if (!isNOU(bodyData) && !isNOU(bodyData.data) && bodyData.data !== '') {
      const decryptedData = decryptData(bodyData.data)
      if (!isNOU(decryptedData)) {
        const formData = new FormData()

        formData.append('email_or_username', decryptedData.emailOrUsername)
        formData.append('password', decryptedData.password)

        const formDataObject: any = {}
        formData.forEach((value, key) => {
          formDataObject[key] = value
        })

        const urlEncodedData = new URLSearchParams(formDataObject).toString()

        const mainPageResponse = await axios.get<TokenRes>(process.env.LEARNX_OPEN_EDX_CSRF_TOKEN_URL ?? 'https://lms.learnx.mn/csrf/api/v1/token')
        const csrfToken = mainPageResponse.data.csrfToken

        const res = await apiClient.post('/user/v2/account/login_session/', urlEncodedData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': csrfToken,
            Cookie: `csrftoken=${csrfToken ?? ''}`,
            Referer: process.env.LEARNX_OPEN_EDX_URL ?? 'https://lms.learnx.mn',
            Origin: process.env.LEARNX_OPEN_EDX_URL ?? 'https://lms.learnx.mn'
          }
        })

        if (!isNOU(res) && !isNOU(res?.data?.success) && res.data.success === true) {
          const cookies = res.headers['set-cookie'] ?? []

          const credentials: any = {}

          cookies.forEach(cookie => {
            const cookieParts = cookie.split(';')[0]
            const [key, value] = cookieParts.split('=')
            credentials[key] = value
          })

          return NextResponse.json({ message: 'Login successful.', credentials })
        } else {
          return new Response(JSON.stringify({ error: 'Failed to login!' }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json'
            }
          })
        }
      } else {
        return new Response(JSON.stringify({ error: 'Failed to login!' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
    } else {
      return new Response(JSON.stringify({ error: 'Failed to login!' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  } catch (error: any) {
    const res = error?.response?.data
    console.error(res)
    return new Response(JSON.stringify({ error: 'Failed to login!', errorCode: res?.error_code, errors: res, errorValue: res.value }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
