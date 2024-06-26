import axios from 'axios'
import { NextResponse } from 'next/server' // Import NextResponse for handling responses

const apiClient = axios.create({
  baseURL: process.env.LEARNX_OPEN_EDX_API ?? 'https://lms.learnx.mn/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const pageSize = searchParams.get('page_size')

    let data
    
    if (page && pageSize) {
      const res = await apiClient.get(`/courses/v1/courses/?page=${page}&page_size=${pageSize}`)
      data = res.data 
    } else {
      const res = await apiClient.get(`/courses/v1/courses/`)
      data = res.data
    }
    
    return NextResponse.json(data) // Ensure we return a response here
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to fetch courses' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
