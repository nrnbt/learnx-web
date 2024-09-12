import CourseIntro from '@/components/student/Course/CourseInto'
import apiClient from '@/utils/api-client'
import { authConfig } from '@/utils/auth'
import { Course, CourseDate, CourseHomeMeta, CourseOutline, CourseOutlineRes, Purchase } from '@/utils/data-types'
import connectDB from '@/utils/mongodb'
import { isNOU } from '@/utils/null-check'
import { getServerSession } from 'next-auth'
// import { cookies } from 'next/headers'
import { FunctionComponent } from 'react'

interface Props {
  params: {
    id: string
  }
}

const CoursePage: FunctionComponent<Props> = async ({ params: { id } }) => {
  const session = await getServerSession(authConfig)
  // const cookieStore = cookies()
  // const userCookies = cookieStore.getAll()
  // const cookieStrings: string[] = userCookies.map(cookie => `${cookie.name}=${cookie.value}`)

  const fetchCourse = async (courseId: string): Promise<Course | null> => {
    try {
      const res = await apiClient.get<Course>(`/courses/v1/courses/${courseId}`, {
        headers: {
          Cookie: session?.user.cookies
        }
      })
      return res.data
    } catch (error: any) {
      console.error(error?.response?.data ?? error)
      return null
    }
  }

  const fetchCourseDate = async (courseId: string): Promise<CourseDate | null> => {
    try {
      const res = await apiClient.get<CourseDate>(`/course_home/v1/dates/${courseId}`, {
        headers: {
          Cookie: session?.user.cookies
        }
      })
      return res.data
    } catch (error: any) {
      console.error(error?.response?.data ?? error)
      return null
    }
  }

  const fetchCourseMeta = async (courseId: string): Promise<CourseHomeMeta | null> => {
    try {
      const res = await apiClient.get<CourseHomeMeta>(`/course_home/v1/course_metadata/${courseId}`, {
        headers: {
          Cookie: session?.user.cookies
        }
      })
      return res.data
    } catch (error: any) {
      console.error(error?.response?.data ?? error)
      return null
    }
  }

  const fetchCourseOutline = async (courseId: string): Promise<CourseOutlineRes | null> => {
    try {
      const res = await apiClient.get<CourseOutline>(`/course_home/outline/${courseId}`, {
        headers: {
          Cookie: session?.user.cookies
        }
      })
      return {
        outline: res.data
      }
    } catch (error: any) {
      console.error(error?.response?.data ?? error)
      return {
        detail: error?.response?.data?.detail
      }
    }
  }

  const coursePurchasedInfo = async (userId: string, courseId: string): Promise<Purchase | null> => {
    try {
      const db = await connectDB()
      const collection = db.collection<Purchase>('purchases')
      const purchase: Purchase | null = await collection.findOne({ userId, courseId })
      return purchase
    } catch (error) {
      console.error('Error checking course purchase:', error)
      throw new Error('Error checking course purchase')
    }
  }

  if (isNOU(id)) {
    return null
  }

  const courseData = await fetchCourse(id)
  const courseDate = await fetchCourseDate(id)
  const courseHomeMeta = await fetchCourseMeta(id)
  const courseOutline = await fetchCourseOutline(id)

  let purchase: Purchase | null = null
  if (!isNOU(session?.user.credentials.edxUserInfo.email)) {
    purchase = await coursePurchasedInfo(session?.user.credentials.edxUserInfo.email, id)
  }

  return (
    <CourseIntro
      courseData={courseData}
      courseDate={courseDate}
      courseHomeMeta={courseHomeMeta}
      courseOutline={courseOutline}
      purchase={purchase}
      session={session}
    />
  )
}

export default CoursePage
