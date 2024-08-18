import apiClient from '@/utils/api-client'
import { isNOU } from '@/utils/null-check'
import { NextResponse } from 'next/server'

export async function GET (request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const blockId = searchParams.get('id')

  try {
    if (!isNOU(blockId)) {
      const res = await apiClient.get(`courses/v1/blocks/${blockId}`)
      return NextResponse.json(res.data)
    }
    return new Response(JSON.stringify({ error: 'Block ID is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error: any) {
    console.error(error?.response.data ?? error)
    return new Response(JSON.stringify({ error: 'Failed to fetch blocks' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
