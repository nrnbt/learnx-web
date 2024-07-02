import apiClient from '@/utils/api-client'
import { decryptData } from '@/utils/crypro'
import { isNOU } from '@/utils/null-check'
import { NextResponse } from 'next/server'

export async function POST (request: Request): Promise<Response> {
  try {
    const bodyData = await request.json()

    if (!isNOU(bodyData) && !isNOU(bodyData.data) && bodyData.data !== '') {
      const decryptedData = decryptData(bodyData.data)
      if (!isNOU(decryptedData)) {
        const formData = new FormData()

        formData.append('email_or_username', decryptedData.username)
        formData.append('password', decryptedData.password)

        const res = await apiClient.post('/user/v2/account/login_session/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        if (!isNOU(res) && !isNOU(res?.data?.success) && res.data.success === true) {
          return NextResponse.json({ message: 'User registered' })
        } else {
          return new Response(JSON.stringify({ error: 'Failed to create user!' }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json'
            }
          })
        }
      } else {
        return new Response(JSON.stringify({ error: 'Failed to create user!' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
    } else {
      return new Response(JSON.stringify({ error: 'Failed to create user!' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  } catch (error: any) {
    const res = error?.response?.data
    console.error(res ?? error)
    return new Response(JSON.stringify({ error: 'Failed to fetch courses', errorCode: res?.error_code, errors: res }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
