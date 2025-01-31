import apiClient from '@/utils/api-client'
import { NextResponse } from 'next/server'

export async function POST (request: Request): Promise<Response> {
  // const body = await request.json()
  // const email: string = body.email ?? ''
  try {
    const res = await apiClient.get('/user/v1/account/password_reset/')
    return NextResponse.json(res.data)
  } catch (error: any) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to fetch user profile data.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
