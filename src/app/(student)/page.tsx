'use client'

import CompTitle from '@/components/student/CompTitle'
import CourseSwiper from '@/components/student/Course/Swiper'
import Testimonial from '@/components/student/Testimonial'
import { useSnackbar } from '@/providers/toaster'
import useCourse from '@/services/courses'
import { theme } from '@/themes/mui-theme'
import { Course } from '@/utils/data-types'
import { isNOU } from '@/utils/null-check'
import { Box, Button, CircularProgress, Typography, useMediaQuery } from '@mui/material'
import { FunctionComponent, useEffect, useState } from 'react'

const testimonials = [
  {
    by: 'John Smith',
    text: "I am thrilled to share that after completing this course, I successfully passed my Microsoft Azure Fundamentals exam! The course material was comprehensive and aligned perfectly with the exam requirements. I couldn't have done it without this fantastic resource."
  },
  {
    by: 'Emily Johnson',
    text: 'After just a few months of diligent study with this course, I am now a Certified ScrumMaster (CSM). The content was clear, engaging, and directly relevant to the certification exam. This course has been instrumental in advancing my career in project management.'
  },
  {
    by: 'Michael Brown',
    text: 'I am delighted to announce that I am now a Google Cloud Certified Associate Cloud Engineer, thanks to this course. The lessons were detailed and well-structured, providing me with the knowledge and confidence to pass the exam on my first attempt. Highly recommended!'
  }
]

const HomePage: FunctionComponent = () => {
  const [topCourses, setTopCourses] = useState<Course[]>([])
  const [coursesloading, setCoursesloading] = useState(false)

  const mobileLayout = useMediaQuery(theme.breakpoints.up('md'))

  const { getCourses } = useCourse()
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    fetchTopCourses1()
      .then(() => { })
      .catch((e) => console.error(e))
  }, [])

  const fetchTopCourses1 = async (): Promise<void> => {
    setCoursesloading(true)
    await getCourses({})
      .then((res) => {
        if (!isNOU(res.results)) {
          setTopCourses(res.results)
        } else {
          showSnackbar('Courses not found!.', 'error')
        }
      })
      .catch((e) => {
        const err = !isNOU(e.message) ? e.message : e.error.message
        showSnackbar(err, 'error')
      })
      .finally(() => {
        setCoursesloading(false)
      })
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col lg:flex-row justify-center my-8 gap-8 md:gap-32 w-full'>
        <Typography
          component='div'
          gutterBottom
          className='flex flex-col justify-center mb-0 text-white'
          style={{ fontSize: !mobileLayout ? '40px' : '80px', fontWeight: 'bold' }}
        >
          <span>GROW UP</span>
          <span className='flex gap-4'>
            <span className='text-secondary'>{'YOUR '}</span>
            <span>SKILL</span>
          </span>
          <span> IN MINUTES</span>
        </Typography>
        <div className='flex justify-center mt-8 md:mt-0'>
          <div className='relative flex justify-center items-center h-64 md:h-96 w-52 md:w-96'>
            <div className='h-full w-full rounded-[100px]' style={{ background: 'linear-gradient(to bottom, #919AFF, #737373)' }} />
            <div className='absolute flex top-4 h-[250px] md:h-[400px] w-[270px] md:w-[400px]'>
              <img
                src='/max.png'
                alt='learner'
                className='object-fill'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='my-4'>
        <CompTitle text='Top courses' />
        {coursesloading
          ? (
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', color: 'white' }}>
              <CircularProgress className='text-white' />
            </Box>
          )
          : (
            <CourseSwiper courses={topCourses} />
          )}
      </div>
      <div className='my-4'>
        <CompTitle text='How learners like you are achieving their goals' />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4'>
          {testimonials.map((item, idx) => (
            <Testimonial key={idx} by={item.by} text={item.text} />
          ))}
        </div>
      </div>
      <div className='flex flex-col lg:flex-row justify-center my-8 gap-8 md:gap-16 w-full'>
        <Typography component='div' gutterBottom className='flex flex-col gap-8 text-[40px] md:text-[60px] font-bold justify-center items-center mb-0 text-white'>
          <div>Wanna become <div className='flex'>Learn <div className='text-secondary'>X</div>’s Teacher?</div></div>
          <Button
            size='large'
            sx={{
              paddingX: '20px',
              paddingY: '10px',
              background: '#A7E628',
              borderRadius: '40px',
              '&:hover': {
                background: '#D1F571'
              }
            }}
            variant='contained'
            className='text-black'
          >
            Become teacher
          </Button>
        </Typography>
        <div className='flex items-center justify-center'>
          <img
            src='/teachers.png'
            alt='become teacher'
            className='p-4 md:p-16 h-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
