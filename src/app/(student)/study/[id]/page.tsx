import CourseStudy from '@/components/student/Course/Learn'
import apiClient from '@/utils/api-client'
import { CourseBlockData, CourseProgress, LearningSequence } from '@/utils/data-types'
import { isNOU } from '@/utils/null-check'
import { CircularProgress } from '@mui/material'
import { cookies } from 'next/headers'
import { FunctionComponent } from 'react'

interface Props {
  params: {
    id: string
  }
}

const CoursePage: FunctionComponent<Props> = async ({ params: { id } }) => {
  const cookieStore = cookies()
  const userCookies = cookieStore.getAll()
  const cookieStrings: string[] = userCookies.map(cookie => `${cookie.name}=${cookie.value}`)

  let loading = false

  // const getUsernameFromCookies = (): string | null => {
  //   const edxUserInfoCookie = userCookies.find(cookie => cookie.name === 'edx-user-info')
  //   if (edxUserInfoCookie != null) {
  //     const decodedValue = decodeURIComponent(edxUserInfoCookie.value)
  //     try {
  //       const userInfo = JSON.parse(decodedValue)
  //       if (typeof userInfo === 'string') {
  //         const userInfoParsed = JSON.parse(userInfo)
  //         return userInfoParsed.username
  //       } else {
  //         return userInfo.username
  //       }
  //     } catch (error) {
  //       console.error('Failed to parse JSON:', error)
  //       return null
  //     }
  //   }
  //   return null
  // }

  const fetchCourseOutlineSequence = async (courseId: string): Promise<LearningSequence | null> => {
    loading = true
    try {
      const url = `/learning_sequences/v1/course_outline/${courseId}`
      const res = await apiClient.get<LearningSequence>(url, {
        headers: {
          Cookie: cookieStrings.join('; ')
        }
      })
      loading = false
      return res.data
    } catch (error: any) {
      console.error(error?.response?.data ?? error)
      loading = false
      return null
    }
  }

  const fetchCourseProgress = async (courseId: string): Promise<CourseProgress | null> => {
    loading = true
    try {
      const res = await apiClient.get<CourseProgress>(`/course_home/progress/${courseId}`, {
        headers: {
          Cookie: cookieStrings.join('; ')
        }
      })
      loading = false
      return res.data
    } catch (error: any) {
      console.error(error?.response?.data ?? error)
      loading = false
      return null
    }
  }

  const fetchCourseBlocks = async (courseId: string): Promise<CourseBlockData | null> => {
    loading = true
    try {
      const url = `/course_home/v1/navigation/${courseId}`
      const res = await apiClient.get<CourseBlockData>(url, {
        headers: {
          Cookie: cookieStrings.join('; ')
        }
      })
      loading = false
      return res.data
    } catch (error: any) {
      console.error(error?.response?.data ?? error)
      loading = false
      return null
    }
  }

  if (isNOU(id)) {
    return null
  }

  const courseProgress = await fetchCourseProgress(id)
  const learningSequence = await fetchCourseOutlineSequence(id)
  const courseBlocks = await fetchCourseBlocks(id)

  if (loading) {
    return (
      <div className='w-full flex justify-center'>
        <CircularProgress size={50} style={{ color: 'white' }} />
      </div>
    )
  }

  return (
    <CourseStudy
      courseId={id}
      courseProgress={courseProgress}
      courseBlocks={courseBlocks}
      learningSequence={learningSequence}
    />
  )
}

export default CoursePage
