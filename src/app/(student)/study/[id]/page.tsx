'use client'

import CustomTabPanel from '@/components/tab/CustomTabPanel'
import { useAuthContext } from '@/providers/auth'
import { useSnackbar } from '@/providers/toaster'
import { CourseProgress } from '@/utils/data-types'
import { isNOU } from '@/utils/null-check'
import { Box, CircularProgress, Tab, Tabs } from '@mui/material'
import axios from 'axios'
import { FunctionComponent, useEffect, useState, SyntheticEvent } from 'react'

const StudyPage: FunctionComponent<{ params: { id: string } }> = ({ params: { id } }) => {
  const courseId = id
  const [courseProgress, setCourseProgress] = useState<CourseProgress | null>(null)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(0)

  const { loaded, isLoggedIn } = useAuthContext()
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    if (loaded && isLoggedIn && typeof courseId === 'string') {
      handleFetchCourseProgress(courseId).catch(() => {})
    }
  }, [loaded, isLoggedIn, courseId])

  const handleFetchCourseProgress = async (courseId: string): Promise<void> => {
    setLoading(true)
    await axios.get(`/api/study?courseId=${courseId}`)
      .then((res) => {
        if (!isNOU(res.data)) {
          setCourseProgress(res.data)
        } else {
          console.error('Course progress not found!')
          showSnackbar('Course progress not found!', 'error')
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

  const handleChange = (event: SyntheticEvent, newValue: number): void => {
    setValue(newValue)
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
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label='Study Page Tabs'>
                  <Tab label='Course' />
                  <Tab label='Progress' />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className='text-white'>
                  {/* Course Content */}
                  <div className='text-nowrap text-white w-full text-2xl mb-4 pl-2 font-bold'><span>Course Details</span></div>
                  {/* Add your course details here */}
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className='text-white'>
                  {/* Progress Content */}
                  <div className='text-nowrap text-white w-full text-2xl mb-4 pl-2 font-bold'><span>Course Progress</span></div>
                  {!isNOU(courseProgress)
                    ? (
                      <div className='text-white'>
                        {/* Add more details about the course progress here */}
                      </div>
                      )
                    : (
                      <p className='text-white'>No progress data available.</p>
                      )}
                </div>
              </CustomTabPanel>
            </Box>
            )
      }
    </div>
  )
}

export default StudyPage
