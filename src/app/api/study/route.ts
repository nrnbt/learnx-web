import apiClient from '@/utils/api-client'
import { CourseProgress } from '@/utils/data-types'
import { isNOU } from '@/utils/null-check'
import { NextResponse } from 'next/server'

export async function GET (request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    if (isNOU(courseId)) {
      return new Response(JSON.stringify({ error: 'Course ID is required.' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    const cookies = request.headers.get('Cookie')
    const res = await apiClient.get<CourseProgress>(`/course_home/progress/${courseId}`, {
      headers: {
        Cookie: cookies
      }
    })
    return NextResponse.json(res.data)
  } catch (error: any) {
    console.error(error?.response ?? error)
    return new Response(JSON.stringify({ error: 'Failed to fetch course progress.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
