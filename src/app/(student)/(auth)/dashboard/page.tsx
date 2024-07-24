'use client'

import CourseComponent from '@/components/student/Course'
import { useAuthContext } from '@/providers/auth'
import { useSnackbar } from '@/providers/toaster'
import { CourseInitItem, CourseInitRes } from '@/utils/data-types'
import { isNOU } from '@/utils/null-check'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'

const DashboardPage: FunctionComponent = () => {
  const [courses, setCourses] = useState<CourseInitItem[]>([])
  const [loading, setLoading] = useState(false)

  const { loaded, isLoggedIn } = useAuthContext()
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    if (loaded && isLoggedIn) {
      handleFetchInitData().catch(() => {})
    }
  }, [loaded, isLoggedIn])

  const handleFetchInitData = async (): Promise<void> => {
    setLoading(true)
    await axios.get<CourseInitRes>('/api/dashboard')
      .then((res) => {
        if (!isNOU(res.data.courses)) {
          console.log(res.data)
          setCourses(res.data.courses)
        } else {
          console.error('My courses not found!')
          showSnackbar('My courses not found!', 'error')
        }
      })
      .catch((e) => {
        console.error(e)
        const errorMessage = e.response?.data?.message ?? e.message ?? 'An error occurred'
        showSnackbar(errorMessage, 'error')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className='flex flex-col justify-start w-full'>
      {
        !loaded || loading
          ? (
            <div className='w-full flex justify-center'>
              <CircularProgress size={50} style={{ color: 'white' }} />
            </div>
            )
          : (
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
            )
      }
    </div>
  )
}

export default DashboardPage
