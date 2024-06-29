'use client'

import { Course, CourseDate, CourseHomeMeta, CourseOutline } from '@/utils/data-types'
import { isNOU } from '@/utils/null-check'
import { Box, Button, Tab, Tabs } from '@mui/material'
import { FunctionComponent, SyntheticEvent, useState } from 'react'

interface Props {
  courseData?: Course
  courseDate?: CourseDate
  courseHomeMeta?: CourseHomeMeta
  courseOutline?: CourseOutline
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const CustomTabPanel = (props: TabPanelProps): JSX.Element => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const a11yProps = (index: number): {} => {
  return {
    id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`
  }
}

const addBaseUrlToImgSrc = (params: { htmlString?: string, baseUrl: string }): string => {
  const { htmlString, baseUrl } = params
  if (isNOU(htmlString)) return ''
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')
  const images = doc.querySelectorAll('img')
  images.forEach(img => {
    const src = img.getAttribute('src')
    if (!isNOU(src) && !src?.startsWith('http')) {
      img.setAttribute('src', `${baseUrl}${src}`)
    }
  })
  return doc.body.innerHTML
}

const CourseIntro: FunctionComponent<Props> = ({ courseData, courseDate, courseHomeMeta, courseOutline }) => {
  const baseUrl = courseData?.blocks_url.split('/api')[0] ?? ''
  const [value, setValue] = useState(0)
  const overviewWithBaseUrl = addBaseUrlToImgSrc({ htmlString: courseData?.overview, baseUrl })

  const handleChange = (event: SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  const handleEnroll = (): void => {
    console.log('enroll')
  }

  return (
    <div className='flex flex-col w-full justify-between items-center'>
      <div className='grid grid-cols-1 md:grid-cols-2 w-full'>
        <div className='flex flex-col gap-2 justify-center w-full text-white'>
          <div className='text-3xl font-bold'>{courseData?.name}</div>
          <div>Number: {courseData?.number}</div>
          <div>Short Desc: {courseData?.short_description}</div>
          <div>By: {courseData?.org}</div>
          <div>Starts: {courseData?.start_display}</div>
          <div>
            <Button
              variant='contained'
              onClick={handleEnroll}
            >
              Enroll Now
            </Button>
          </div>
        </div>
        <img
          src={baseUrl + (courseData?.media.course_image.uri ?? '')}
          alt={courseData?.name}
          className='w-full object-contain border-4 border-secondary rounded-xl'
        />
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='Course Tabs'>
            <Tab className='text-white' label='Overview' {...a11yProps(0)} />
            <Tab className='text-white' label='Outline' {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div
            className='text-white'
            dangerouslySetInnerHTML={{ __html: overviewWithBaseUrl }}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {JSON.stringify(courseOutline)}
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default CourseIntro
