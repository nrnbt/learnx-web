import { CourseInitItem } from '@/utils/data-types'
import { Button } from '@mui/material'
import cn from 'classnames'
import dayjs from 'dayjs'
import Image from 'next/image'
// import Link from 'next/link'
import { FunctionComponent } from 'react'

interface Props {
  className?: string
  course: CourseInitItem
}

const CourseComponent: FunctionComponent<Props> = ({ className, course }) => {
  const imgSrc = (process.env.LEARNX_OPEN_EDX_URL ?? 'https://lms.learnx.mn') + course.course.bannerImgSrc
  return (
    <div className={cn('flex max-w-[800px] w-full justify-between shadow-2xl p-4 rounded-lg border border-secondary', className)}>
      <div className='flex w-full'>
        <Image
          src={imgSrc}
          alt={course.course.courseName}
          className='h-40 object-contain'
          width={300}
          height={200}
        />
        <div className='flex flex-col'>
          <div className='p-4'>
            <span className='font-bold text-white text-lg text-nowrap'>{course.course.courseName}</span>
          </div>
          <div className='px-4'>
            <span className='text-white text-sm text-nowrap'>Organization: {course.courseProvider.name}</span>
          </div>
          <div className='px-4'>
            <span className='text-white text-sm text-nowrap'>Started: {dayjs(course.courseRun.startDate).format('YYYY-MM-DD')}</span>
          </div>
          <div className='px-4'>
            <span className='text-white text-sm text-nowrap'>Min Pass Grade: {parseFloat(course.courseRun.minPassingGrade) * 100}%</span>
          </div>
        </div>
      </div>
      <div className='flex w-full justify-end items-end'>
        <div>
          <Button variant='contained' color='secondary'>
            {/* <Link href={'/study/' + course.courseRun.courseId}> */}
            Resume
            {/* </Link> */}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CourseComponent
