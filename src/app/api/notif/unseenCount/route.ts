import apiClient from '@/utils/api-client'
import { NextResponse } from 'next/server'

export async function GET (request: Request): Promise<Response> {
  const cookies = request.headers.get('Cookie')

  try {
    const res = await apiClient.get('/notifications/count/', {
      headers: {
        Cookie: cookies
      }
    })
    return NextResponse.json(res.data)
  } catch (error: any) {
    console.error(error?.response?.data?.detail ?? error ?? 'Error fetching notifications count.')
    return new Response(JSON.stringify({ error: 'Failed to fetch notifications count' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
