import CourseIntro from '@/components/student/Course/CourseInto'
import apiClient from '@/utils/api-client'
import { Course } from '@/utils/data-types'
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

  if (isNOU(id)) {
    return null
  }

  const courseData = await fetchCourse(id)

  return <CourseIntro courseData={courseData} />
}

export default CoursePage
