import apiClient from '@/utils/api-client'
import { isNOU } from '@/utils/null-check'
import { NextResponse } from 'next/server'

export async function GET (request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)

  try {
    const page = searchParams.get('page')
    const pageSize = searchParams.get('page_size')

    let data

    if (!isNOU(page) && !isNOU(pageSize) && page !== '' && pageSize !== '') {
      const res = await apiClient.get(`/courses/v1/courses/?page=${page ?? ''}&page_size=${pageSize ?? ''}`)
      data = res.data
    } else {
      const res = await apiClient.get('/courses/v1/courses/')
      data = res.data
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error(error?.response ?? error)
    return new Response(JSON.stringify({ error: 'Failed to fetch courses' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
