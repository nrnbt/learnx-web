import apiClient from "@/utils/api-client";

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
    
    return Response.json(data)
  } catch (error) {
    console.error(error)
  }
}