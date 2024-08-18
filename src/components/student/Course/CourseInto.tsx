'use client'

// import { useAuthContext } from '@/providers/auth'
import { Course, CourseDate, CourseHomeMeta, CourseOutlineRes } from '@/utils/data-types'
import { isNOU } from '@/utils/null-check'
import { Box, Button } from '@mui/material'
// import { useRouter } from 'next/navigation'
import { FunctionComponent, useEffect, useState } from 'react'
import '../../../../public/css/lms.main.css'

interface Props {
  courseData?: Course | null
  courseDate?: CourseDate | null
  courseHomeMeta?: CourseHomeMeta | null
  courseOutline?: CourseOutlineRes | null
}

// const a11yProps = (index: number): {} => {
//   return {
//     id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`
//   }
// }

const addBaseUrlToImgSrc = (params: { htmlString?: string, baseUrl: string }): string => {
  const { htmlString, baseUrl } = params
  if (isNOU(htmlString)) return ''
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')
  const images = doc.querySelectorAll('img')
  images.forEach(img => {
    const src = img.getAttribute('src')
    if (!isNOU(src) && !src.startsWith('http')) {
      img.setAttribute('src', `${baseUrl}${src}`)
    }
  })
  return doc.body.innerHTML
}

const CourseIntro: FunctionComponent<Props> = ({ courseData, courseDate, courseHomeMeta, courseOutline }) => {
  const baseUrl = courseData?.blocks_url.split('/api')[0] ?? ''
  // const [value, setValue] = useState(0)
  const [overviewWithBaseUrl, setOverviewWithBaseUrl] = useState('')

  // const { isLoggedIn } = useAuthContext()
  // const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && !isNOU(window.DOMParser)) {
      const imgBaseUrl = addBaseUrlToImgSrc({ htmlString: courseData?.overview, baseUrl })
      setOverviewWithBaseUrl(imgBaseUrl)
    }
  }, [courseData, baseUrl])

  // const handleChange = (event: SyntheticEvent, newValue: number): void => {
  //   setValue(newValue)
  // }

  const handleEnroll = (): void => {
    // if (isLoggedIn) {
    //   if (!isNOU(courseHomeMeta) && courseHomeMeta.is_enrolled) {
    //     router.push(`/study/${courseData?.id ?? ''}`)
    //   } else {
    //     router.push(`/enroll/${courseData?.id ?? ''}`)
    //   }
    // } else {
    //   router.push('/login')
    // }
  }

  return (
    <div className='flex flex-col w-full justify-between items-center'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 w-full'>
        <div className='flex flex-col gap-2 justify-center w-full text-white'>
          <div className='text-3xl font-bold'>{courseData?.name}</div>
          <div>Number: {courseData?.number}</div>
          <div>Short Desc: {courseData?.short_description}</div>
          <div>By: {courseData?.org}</div>
          <div>Starts: {courseData?.start_display}</div>
          <div className='pt-4'>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleEnroll}
              className='font-bold'
            >
              Enroll Now
              {/* {!isNOU(courseHomeMeta) && courseHomeMeta.is_enrolled ? 'Resume' : 'Enroll Now'} */}
            </Button>
          </div>
        </div>
        <div className='flex justify-center md:justify-end'>
          <img
            src={baseUrl + (courseData?.media.course_image.uri ?? '')}
            alt={courseData?.name}
            className='w-full m-4 md:m-0 md:w-2/3 object-cover border-4 border-secondary rounded-xl'
          />
        </div>
      </div>
      <Box sx={{ width: '100%', marginTop: '24px' }}>
        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='Course Tabs'>
            <Tab label='Overview' {...a11yProps(0)} />
            <Tab label='Outline' {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}> */}
        <div
          className='text-white'
          dangerouslySetInnerHTML={{ __html: overviewWithBaseUrl }}
        />
        {/* </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className='text-white'>
            {isNOU(courseOutline?.outline) ? courseOutline?.detail : <CourseOutlineInfo outline={courseOutline.outline} />}
          </div>
        </CustomTabPanel> */}
      </Box>
    </div>
  )
}

export default CourseIntro
