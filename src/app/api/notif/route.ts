import apiClient from '@/utils/api-client'
import { NextResponse } from 'next/server'

export async function GET (request: Request): Promise<Response> {
  const cookies = request.headers.get('Cookie')

  try {
    const res = await apiClient.get('/notifications/', {
      headers: {
        Cookie: cookies
      }
    })
    return NextResponse.json(res.data)
  } catch (error: any) {
    console.error(error?.response?.data?.detail ?? error ?? 'Error fetching notifications')
    return new Response(JSON.stringify({ error: 'Failed to fetch courses' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
