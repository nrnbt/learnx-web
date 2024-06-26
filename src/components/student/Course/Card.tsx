import { Course } from "@/utils/data-types"
import { Typography } from "@mui/material"
import cn from 'classnames'
import { FunctionComponent } from "react"

interface Props {
  course: Course
  classname?: string
}

const CourseCard: FunctionComponent<Props> = ({ course, classname }) => {
  return (
    <div className={cn('max-w-[345px] w-full', classname)}>
      <img
        src={course.blocks_url.split('/api')[0] + course.media.course_image.uri}
        alt={course.name}
        className="border-secondary border-4 rounded-xl w-full h-[230px] object-cover"
      />
      <div className="flex flex-col gap-2 pt-4 text-white">
        <Typography gutterBottom variant="h5" component="div" className="font-semibold">
          {course.name}
        </Typography>
        <Typography variant="body2" color="">
          {course.short_description}
        </Typography>
        <Typography variant="body2" color="">
          By: {course.org}
        </Typography>
      </div>
    </div>
  )
}

export default CourseCard