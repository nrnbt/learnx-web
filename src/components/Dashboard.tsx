import { CourseInitItem } from '@/utils/data-types'
import { FunctionComponent } from 'react'
import CourseComponent from './student/Course'

interface Props {
  courses: CourseInitItem[]
}

const Dashboard: FunctionComponent<Props> = ({ courses }) => {
  return (
    <div className='flex flex-col justify-start w-full'>
      <div className='flex flex-col'>
        <div className='text-nowrap text-white w-full text-2xl mb-4 pl-2 font-bold'><span>My Courses</span></div>
        {courses.map((course, idx) => {
          return (
            <div key={idx}>
              <CourseComponent course={course} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
