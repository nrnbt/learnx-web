import { CourseOutline } from '@/utils/data-types'
import { isNOU } from '@/utils/null-check'
import { Card, CardContent, Typography } from '@mui/material'
import Link from 'next/link'
import { FunctionComponent } from 'react'

interface Props {
  outline: CourseOutline
}

const CourseOutlineInfo: FunctionComponent<Props> = ({ outline }) => {
  return (
    <div className='p-4'>
      <Card className='mb-4'>
        <CardContent>
          <Typography variant='h5' component='div'>
            Course Information
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Missed Deadlines: {outline.dates_banner_info === 'true' ? 'Yes' : 'No'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Content Type Gating Enabled: {outline.can_show_upgrade_sock === 'true' ? 'Yes' : 'No'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Missed Gated Content: {outline.dates_banner_info === 'true' ? 'Yes' : 'No'}
          </Typography>
          {!isNOU(outline.verified_mode) && (
            <Link href={outline.verified_mode} target='_blank' rel='noopener noreferrer'>
              Verified Upgrade Link
            </Link>
          )}
          <Typography variant='body2' color='text.secondary'>
            Can Show Upgrade Sock: {outline.can_show_upgrade_sock === 'true' ? 'Yes' : 'No'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Verified Mode: {!isNOU(outline.verified_mode) ? outline.verified_mode : 'N/A'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Access Expiration: {!isNOU(outline.access_expiration) ? Object.values(outline.access_expiration).join(', ') : 'N/A'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Certificate Data: {!isNOU(outline.cert_data) ? `${outline.cert_data.cert_status}, ${outline.cert_data.cert_web_view_url}` : 'N/A'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Course Blocks: {!isNOU(outline.course_blocks) ? outline.course_blocks.blocks : 'Not Available'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Weekly Learning Goal Enabled: {outline.course_goals.weekly_learning_goal_enabled ? 'Yes' : 'No'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Course Tools: {outline.course_tools.length > 0 ? 'Available' : 'Not Available'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Dates Tab Link: <Link href={outline.dates_widget.dates_tab_link} target='_blank' rel='noopener noreferrer'>View Dates</Link>
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            User Timezone: {!isNOU(outline.dates_widget.user_timezone) ? outline.dates_widget.user_timezone : 'N/A'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Can Enroll: {outline.enroll_alert.can_enroll ? 'Yes' : 'No'}
          </Typography>
          {!isNOU(outline.enroll_alert.extra_text) && (
            <Typography variant='body2' color='text.secondary'>
              Extra Text: {outline.enroll_alert.extra_text}
            </Typography>
          )}
          <Typography variant='body2' color='text.secondary'>
            Enrollment Mode: {!isNOU(outline.enrollment_mode) ? outline.enrollment_mode : 'N/A'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Enable Proctored Exams: {outline.enable_proctored_exams ? 'Yes' : 'No'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Handouts HTML: {!isNOU(outline.handouts_html) ? outline.handouts_html : 'N/A'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Course Has Ended: {outline.has_ended ? 'Yes' : 'No'}
          </Typography>
          {!isNOU(outline.offer) && (
            <Typography variant='body2' color='text.secondary'>
              Offer: {Object.values(outline.offer).join(', ')}
            </Typography>
          )}
          {outline.resume_course.has_visited_course && !isNOU(outline.resume_course.url) && (
            <Typography variant='body2' color='text.secondary'>
              Resume Course:
              {/* <Link href={outline.resume_course.url} target='_blank' rel='noopener noreferrer'> */}
              Continue Learning
              {/* </Link> */}
            </Typography>
          )}
          <Typography variant='body2' color='text.secondary'>
            User Has Passing Grade: {outline.user_has_passing_grade ? 'Yes' : 'No'}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default CourseOutlineInfo
