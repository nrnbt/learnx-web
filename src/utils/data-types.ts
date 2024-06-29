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
  overview?: string
}

export interface Pagination {
  next: string | null
  previous: string | null
  count: number
  num_pages: number
}

export interface DateSummary {
  assignment_type: string
  complete?: boolean
  date: string
  date_type: string
  description: string
  learner_has_access: string
  link: string
  link_text: string
  title: string
  extra_info: string
  first_component_block_id: string
}

export interface CourseDate {
  dates_banner_info: string
  course_date_blocks: DateSummary[]
  has_ended: boolean
  learner_is_full_access: boolean
  user_timezone: string
}

export interface Celebrations {
  [key: string]: string | null
}

export interface CourseAccess {
  [key: string]: string | null
}

export interface CourseTab {
  tab_id: string
  title: string
  url: string
}

export interface CourseHomeMeta {
  can_show_upgrade_sock: string
  verified_mode: string
  celebrations: Celebrations
  course_access: CourseAccess
  course_id: string
  is_enrolled: boolean
  is_self_paced: boolean
  is_staff: boolean
  number: string
  org: string
  original_user_is_staff: boolean
  start: string
  tabs: CourseTab[]
  title: string
  username: string
  user_timezone: string
  can_view_certificate: boolean
}

export interface AccessExpiration {
  [key: string]: string | null
}

export interface CertificateData {
  cert_status: string
  cert_web_view_url: string
  download_url: string
  certificate_available_date: string // assuming this follows ISO 8601 date-time format
}

export interface CourseBlock {
  blocks: string
}

export interface SelectedGoal {
  [key: string]: string | null
}

export interface CourseGoals {
  selected_goal: SelectedGoal
  weekly_learning_goal_enabled: boolean
}

export interface CourseTool {
  analytics_id: string
  title: string
  url: string
}

export interface DatesWidget {
  course_date_blocks: DateSummary[]
  dates_tab_link: string
  user_timezone: string
}

export interface EnrollAlert {
  can_enroll: boolean
  extra_text: string
}

export interface Offer {
  [key: string]: string | null
}

export interface ResumeCourse {
  has_visited_course: boolean
  url: string
}

export interface CourseOutline {
  dates_banner_info: string
  can_show_upgrade_sock: string
  verified_mode: string
  access_expiration: AccessExpiration
  cert_data: CertificateData
  course_blocks: CourseBlock
  course_goals: CourseGoals
  course_tools: CourseTool[]
  dates_widget: DatesWidget
  enroll_alert: EnrollAlert
  enrollment_mode: string
  enable_proctored_exams: boolean
  handouts_html: string
  has_ended: boolean
  offer: Offer
  resume_course: ResumeCourse
  welcome_message_html: string
  user_has_passing_grade: boolean
}

export interface CourseOutlineRes {
  outline?: CourseOutline
  detail?: string
}
