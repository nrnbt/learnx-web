import apiClient from '@/utils/api-client'
import { decryptData } from '@/utils/crypro'
import { isNOU } from '@/utils/null-check'
import { NextResponse } from 'next/server'

export async function POST (request: Request): Promise<Response> {
  try {
    const bodyData = await request.json()
    const courseId = bodyData.courseId

    if (!isNOU(bodyData) && !isNOU(bodyData.data) && bodyData.data !== '') {
      const decryptedData = decryptData(bodyData.data)
      if (!isNOU(decryptedData)) {
        const formData = new FormData()

        formData.append('username', decryptedData.username)
        formData.append('password', decryptedData.password)
        formData.append('email', decryptedData.email)
        formData.append('name', decryptedData.name)

        if (!isNOU(courseId)) {
          formData.append('course_id', courseId)
        }

        const res = await apiClient.post('/user/v2/account/registration/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Referer: 'https://www.learnx.mn'
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
    return new Response(JSON.stringify({ error: 'Failed to fetch courses', errorCode: res?.errorCode, errors: res }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
