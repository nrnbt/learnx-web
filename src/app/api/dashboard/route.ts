import apiClient from '@/utils/api-client'
import { CourseInitRes } from '@/utils/data-types'
import { NextResponse } from 'next/server'

export async function GET (request: Request): Promise<Response> {
  try {
    const cookies = request.headers.get('Cookie')
    const res = await apiClient.get<CourseInitRes>('/learner_home/init/', {
      headers: {
        Cookie: cookies
      }
    })
    return NextResponse.json(res.data)
  } catch (error: any) {
    console.error(error?.response ?? error)
    return new Response(JSON.stringify({ error: 'Failed to fetch init data.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
