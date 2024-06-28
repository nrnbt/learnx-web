'use client'

import { Course } from '@/utils/data-types'
import { FunctionComponent } from 'react'

interface Props {
  courseData?: Course
}

const CourseIntro: FunctionComponent<Props> = ({ courseData }) => {
  console.log(courseData)
  return (
    <div>
      {courseData?.name}
    </div>
  )
}

export default CourseIntro
