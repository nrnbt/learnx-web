export interface CourseMedia {
  banner_image: {
    uri: string
    uri_absolute?: string
  }
  course_image: {
    uri: string
  }
  course_video: {
    uri: string | null
  }
  image: {
    raw: string
    small: string
    large: string
  }
}

export interface Course {
  blocks_url: string
  effort: string | null
  end: string | null
  enrollment_start: string | null
  enrollment_end: string | null
  id: string
  media: CourseMedia
  name: string
  number: string
  org: string
  short_description: string | null
  start: string
  start_display: string | null
  start_type: string
  pacing: string
  mobile_available: boolean
  hidden: boolean
  invitation_only: boolean
  course_id: string
}

export interface Pagination {
  next: string | null
  previous: string | null
  count: number
  num_pages: number
}
