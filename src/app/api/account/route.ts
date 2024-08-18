import apiClient from '@/utils/api-client'
import { CourseInitRes } from '@/utils/data-types'
import { NextResponse } from 'next/server'

export async function GET (request: Request): Promise<Response> {
  try {
    const cookies = request.headers.get('Cookie')

    const getCookieValue = (cookieString: string, cookieName: string): string => {
      const name = cookieName + '='
      const decodedCookie = decodeURIComponent(cookieString)
      const cookies = decodedCookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length)
        }
      }
      return ''
    }

    // Get the edx-user-info cookie value
    const edxUserInfoEncoded = getCookieValue(cookies ?? '', 'edx-user-info')

    // Decode the URL-encoded value
    const edxUserInfoDecoded = decodeURIComponent(edxUserInfoEncoded)

    // Parse the JSON string to an object
    const edxUserInfoJSON = JSON.parse(edxUserInfoDecoded)

    // Access the learner_profile URL
    const learnerProfileUrl = edxUserInfoJSON.header_urls.learner_profile

    const res = await apiClient.get<CourseInitRes>('/user/v1/accounts/', {
      headers: {
        Cookie: cookies
      }
    })
    return NextResponse.json({ userProfile: res.data })
  } catch (error: any) {
    // console.error(error?.response ?? error)
    return new Response(JSON.stringify({ error: 'Failed to fetch user profile data.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
