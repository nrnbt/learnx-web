import CourseIntro from '@/components/student/Course/CourseInto'
import apiClient from '@/utils/api-client'
import { Course, CourseHomeMeta } from '@/utils/data-types'
import { isNOU } from '@/utils/null-check'
import { FunctionComponent } from 'react'

interface Props {
  params: {
    id: string
  }
}

const CoursePage: FunctionComponent<Props> = async ({ params: { id } }) => {
  const fetchCourse = async (courseId: string): Promise<Course> => {
    const res = await apiClient.get<Course>(`/courses/v1/courses/${courseId}`)
    return res.data
  }

  // const fetchCourseDate = async (courseId: string): Promise<CourseDate> => {
  //   const res = await apiClient.get<CourseDate>(`/course_home/v1/dates/${courseId}`)
  //   return res.data
  // }

  const fetchCourseMeta = async (courseId: string): Promise<CourseHomeMeta> => {
    const res = await apiClient.get<CourseHomeMeta>(`/course_home/v1/course_metadata/${courseId}`)
    return res.data
  }

  // const fetchCourseOutline = async (courseId: string): Promise<CourseOutline> => {
  //   const res = await apiClient.get<CourseOutline>(`/course_home/v1/outline/${courseId}`)
  //   return res.data
  // }

  if (isNOU(id)) {
    return null
  }

  const courseData = await fetchCourse(id)
  // const courseDate = await fetchCourseDate(id)
  const courseHomeMeta = await fetchCourseMeta(id)
  // const courseOutline = await fetchCourseOutline(id)

  return (
    <CourseIntro
      courseData={courseData}
      courseDate={undefined}
      courseHomeMeta={courseHomeMeta}
      courseOutline={undefined}
    />
  )
}

export default CoursePage
