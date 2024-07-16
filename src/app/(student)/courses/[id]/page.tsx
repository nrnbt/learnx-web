import CourseIntro from '@/components/student/Course/CourseInto'
import apiClient from '@/utils/api-client'
import { Course, CourseDate, CourseHomeMeta, CourseOutline, CourseOutlineRes } from '@/utils/data-types'
import { isNOU } from '@/utils/null-check'
import { FunctionComponent } from 'react'

interface Props {
  params: {
    id: string
  }
}

const CoursePage: FunctionComponent<Props> = async ({ params: { id } }) => {
  const fetchCourse = async (courseId: string): Promise<Course | null> => {
    try {
      const res = await apiClient.get<Course>(`/courses/v1/courses/${courseId}`)
      return res.data
    } catch (error: any) {
      console.error(error?.response?.data ?? error)
      return null
    }
  }

  const fetchCourseDate = async (courseId: string): Promise<CourseDate | null> => {
    try {
      const res = await apiClient.get<CourseDate>(`/course_home/v1/dates/${courseId}`)
      return res.data
    } catch (error: any) {
      console.error(error?.response?.data ?? error)
      return null
    }
  }

  const fetchCourseMeta = async (courseId: string): Promise<CourseHomeMeta | null> => {
    try {
      const res = await apiClient.get<CourseHomeMeta>(`/course_home/v1/course_metadata/${courseId}`)
      return res.data
    } catch (error: any) {
      console.error(error?.response?.data ?? error)
      return null
    }
  }

  const fetchCourseOutline = async (courseId: string): Promise<CourseOutlineRes | null> => {
    try {
      const res = await apiClient.get<CourseOutline>(`/course_home/outline/${courseId}`)
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

  if (isNOU(id)) {
    return null
  }

  const courseData = await fetchCourse(id)
  const courseDate = await fetchCourseDate(id)
  const courseHomeMeta = await fetchCourseMeta(id)
  const courseOutline = await fetchCourseOutline(id)

  return (
    <CourseIntro
      courseData={courseData}
      courseDate={courseDate}
      courseHomeMeta={courseHomeMeta}
      courseOutline={courseOutline}
    />
  )
}

export default CoursePage
