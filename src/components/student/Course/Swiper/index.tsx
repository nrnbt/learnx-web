import { Course } from '@/utils/data-types'
import { FunctionComponent } from 'react'
import CourseCard from '../Card'

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import './swiper.css'

import { useMediaQuery } from '@mui/material'
import { theme } from '@/themes/mui-theme'

interface Props {
  courses: Course[]
}

const CourseSwiperLg: FunctionComponent<Props> = ({ courses }) => {
  const mobileLayout = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={mobileLayout ? 50 : 0}
      slidesPerView={mobileLayout ? 3 : 1}
      navigation
      pagination={{ clickable: true }}
    >
      {courses.map((course, idx) => (
        <SwiperSlide
          key={idx}
          className='flex justify-center items-center h-full w-full'
        >
          <CourseCard course={course} classname='m-auto mb-8 pb-4' />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default CourseSwiperLg
