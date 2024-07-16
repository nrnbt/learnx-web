import apiClient from '@/utils/api-client'

export async function GET (request: Request): Promise<Response> {
  try {
    const cookie = request.headers.get('Cookie')
    console.log(cookie)
    const initData = await apiClient.get('/learner_home/init/')
    // console.log(notifications)
    return new Response()
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
