'use client'

import { useAuthContext } from '@/providers/auth'
import { useSnackbar } from '@/providers/toaster'
import { Course } from '@/utils/data-types'
import { isNOU } from '@/utils/null-check'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'

const DashboardPage: FunctionComponent = () => {
  const [courses, setCourses] = useState<Course[]>([])
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
    await axios.get<{ courses: Course[] }>('/api/dashboard')
      .then((res) => {
        if (!isNOU(res.data.courses)) {
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
    <div>
      {
        !loaded || loading
          ? (
            <CircularProgress size={50} />
            )
          : (
              courses.map((course, idx) => {
                return (
                  <div key={idx}>
                    {course.name}
                  </div>
                )
              })
            )
      }
    </div>
  )
}

export default DashboardPage
