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
  const { credentials, loaded } = useAuthContext()
  const { showSnackbar } = useSnackbar()

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
        showSnackbar(e, 'error')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (!loaded || loading) {
    return <CircularProgress size={50} />
  }

  useEffect(() => {
    if (loaded) {
      handleFetchInitData().catch(() => {})
    }
  }, [loaded])

  return (
    <div>
      {courses.map((course, idx) => {
        return (
          <div key={idx}>
            {course.name}
          </div>
        )
      })}
    </div>
  )
}

export default DashboardPage
