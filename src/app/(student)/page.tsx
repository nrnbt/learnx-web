'use client'

import CompTitle from "@/components/student/CompTitle"
import CourseSwiper from "@/components/student/Course/Swiper"
import Testimonial from "@/components/student/Testimonial"
import { useSnackbar } from "@/providers/toaster"
import useCourse from "@/services/courses"
import { Course } from "@/utils/data-types"
import { Button, Typography } from "@mui/material"
import Image from "next/image"
import { FunctionComponent, useEffect, useState } from "react"

const  testimonials = [
  {
    by: 'John Smith',
    text: "I am thrilled to share that after completing this course, I successfully passed my Microsoft Azure Fundamentals exam! The course material was comprehensive and aligned perfectly with the exam requirements. I couldn't have done it without this fantastic resource."
  },
  {
    by: 'Emily Johnson',
    text: "After just a few months of diligent study with this course, I am now a Certified ScrumMaster (CSM). The content was clear, engaging, and directly relevant to the certification exam. This course has been instrumental in advancing my career in project management."
  },
  {
    by: 'Michael Brown',
    text: "I am delighted to announce that I am now a Google Cloud Certified Associate Cloud Engineer, thanks to this course. The lessons were detailed and well-structured, providing me with the knowledge and confidence to pass the exam on my first attempt. Highly recommended!"
  },
]

const HomePage: FunctionComponent  = () => {
  const [topCourses, setTopCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)

  const { getCourses } = useCourse()
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    fetchTopCourses()
  }, [])
  
  const fetchTopCourses = async (): Promise<void> => {
    await getCourses({})
      .then((res) => {
        if(res.results){
          setTopCourses(res.results)
        } else {
          showSnackbar('Courses not found!.', 'error')
        }
      })
      .catch((e) => {
        showSnackbar(e.message || e.error.message, 'error')
      })
  }

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row justify-center my-8 gap-8 md:gap-32 w-full">
        <Typography component='div' gutterBottom className="text-[40px] md:text-[80px] font-bold flex flex-col justify-center mb-0 text-white">
          <span>GROW UP</span>
          <span className="flex gap-4">
            <span className="text-secondary">{"YOUR "}</span>
            <span>SKILL</span>
          </span>
          <span> IN MINUTES</span>
        </Typography>
        <div className="flex justify-center mt-8 md:mt-0">
          <div className="relative flex justify-center items-center h-64 md:h-96 w-52 md:w-96">
            <div className="h-full w-full rounded-[100px]" style={{ background: 'linear-gradient(to bottom, #919AFF, #737373)' }}/>
            <div className="absolute flex top-4 h-[250px] md:h-[400px] w-[270px] md:w-[400px]">
              <Image
                src='/max.png' 
                objectFit='contain'
                layout="fill"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-4">
        <CompTitle text="Top courses" />
        <CourseSwiper courses={topCourses}/>
      </div>
      <div className="my-4">
        <CompTitle text="Top courses" />
        <CourseSwiper courses={topCourses}/>
      </div>
      <div className="my-4">
        <CompTitle text="How learners like you are achieving their goals" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
          {testimonials.map((item, idx) => (
            <Testimonial key={idx} by={item.by} text={item.text} />
          ))}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center my-8 gap-8 md:gap-16 w-full">
        <Typography component='div' gutterBottom className="flex flex-col gap-8 text-[40px] md:text-[60px] font-bold justify-center items-center mb-0 text-white">
          <div>Wanna become <div className="flex">Learn <div className="text-secondary">X</div>’s Teacher?</div></div>
          <Button 
              size="large"
              sx={{
                paddingX: '20px',
                paddingY: '10px',
                background: '#A7E628',
                borderRadius: '40px',
                '&:hover': {
                  background: '#D1F571',
                },
              }}
              variant='contained'
              className="text-black"
          >
            Become teacher
          </Button>
        </Typography>
        <div className="flex items-center">
          <img
            src='/teachers.png'
            alt="become teacher"
            className="p-8 md:p-16 h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
