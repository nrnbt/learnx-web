
import Dashboard from '@/components/Dashboard'
import apiClient from '@/utils/api-client'
import { authConfig } from '@/utils/auth'
import { CourseInitItem, CourseInitRes } from '@/utils/data-types'
import { getServerSession } from 'next-auth'
import { FunctionComponent } from 'react'

const DashboardPage: FunctionComponent = async () => {
  const session = await getServerSession(authConfig)

  const handleFetchInitData = async (): Promise<CourseInitItem[]> => {
    const res = await apiClient.get<CourseInitRes>('/learner_home/init/', {
      headers: {
        Cookie: session?.user.cookies ?? ''
      }
    })
    return res.data.courses
  }

  const myCourses = await handleFetchInitData()

  return (
    <Dashboard courses={myCourses} />
  )
}

export default DashboardPage
