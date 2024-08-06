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

export interface EmailConfirmation {
  isNeeded: boolean
  sendEmailUrl: string
}

export interface PlatformSettings {
  supportEmail: string
  billingEmail: string
  courseSearchUrl: string
}

export interface CourseProvider {
  name: string
}

export interface CourseRun {
  isStarted: boolean
  isArchived: boolean
  courseId: string
  minPassingGrade: string
  startDate: string
  endDate: string | null
  homeUrl: string
  marketingUrl: string | null
  progressUrl: string
  unenrollUrl: string
  upgradeUrl: string | null
  resumeUrl: string
}

export interface CoursewareAccess {
  hasUnmetPrerequisites: boolean
  isTooEarly: boolean
  isStaff: boolean
}

export interface Enrollment {
  accessExpirationDate: string | null
  isAudit: boolean
  hasStarted: boolean
  coursewareAccess: CoursewareAccess
  isVerified: boolean
  canUpgrade: boolean
  isAuditAccessExpired: boolean
  isEmailEnabled: boolean
  hasOptedOutOfEmail: boolean
  lastEnrolled: string
  isEnrolled: boolean
  mode: string
}

export interface Certificate {
  availableDate: string | null
  isRestricted: boolean
  isEarned: boolean
}

export interface CourseInit {
  bannerImgSrc: string
  courseName: string
  courseNumber: string
  socialShareUrl: string
}

export interface CourseInitItem {
  course: CourseInit
  courseProvider: CourseProvider
  courseRun: CourseRun
  enrollment: Enrollment
  certificate: Certificate
}

export interface CourseInitRes {
  emailConfirmation: EmailConfirmation
  enterpriseDashboard: any
  platformSettings: PlatformSettings
  courses: CourseInitItem[]
}

export interface UserProfile {
  account_privacy: string
  profile_image: ProfileImage
  username: string
  bio: string | null
  course_certificates: string | null
  country: string | null
  date_joined: string
  language_proficiencies: string[]
  level_of_education: string | null
  social_links: string[]
  time_zone: string | null
  name: string
  email: string
  id: number
  verified_name: string | null
  extended_profile: any[]
  gender: string | null
  state: string | null
  goals: string
  is_active: boolean
  last_login: string
  mailing_address: string
  requires_parental_consent: boolean
  secondary_email: string | null
  secondary_email_enabled: boolean | null
  year_of_birth: number | null
  phone_number: string | null
  activation_key: string
  pending_name_change: string | null
}

export interface ProfileImage {
  has_image: boolean
  image_url_full: string
  image_url_large: string
  image_url_medium: string
  image_url_small: string
}

export interface CompletionSummary {
  [key: string]: string | null
}

export interface CourseGrade {
  letter_grade: string
  percent: number
  is_passing: boolean
}

export interface CreditCourseRequirements {
  [key: string]: string | null
}

export interface GradingPolicy {
  assignment_policies: string
  grade_range: {
    [key: string]: string | null
  }
}

export interface SectionScores {
  display_name: string
  subsections: any[] // Replace with actual subsection type if available
}

export interface VerificationData {
  link: string
  status: string
  status_date: string // Date-time string
}

export interface CourseProgress {
  can_show_upgrade_sock: string
  verified_mode: string
  access_expiration: { [key: string]: string | null }
  certificate_data: CertificateData
  completion_summary: CompletionSummary
  course_grade: CourseGrade
  credit_course_requirements: CreditCourseRequirements
  end: string // Date-time string
  enrollment_mode: string
  grading_policy: GradingPolicy
  has_scheduled_content: boolean
  section_scores: SectionScores[]
  studio_url: string
  username: string
  user_has_passing_grade: boolean
  verification_data: VerificationData
  disable_progress_graph: boolean
}

export interface Lti {
  lti_1p1_client_key: string
  lti_1p1_client_secret: string
  lti_1p1_launch_url: string
  version: string
  lti_config: any
}

export interface CourseLive {
  course_key: string
  provider_type: string
  enabled: boolean
  lti_configuration: Lti
  pii_sharing_allowed: string
  free_tier: boolean
}

export interface CourseLiveRes {
  courseLive?: CourseLive
  detail?: string
}

export interface LearningSequence {
  course_key: string
  course_start: string
  course_end: string | null
  title: string
  published_at: string
  published_version: string
  entrance_exam_id: string | null
  days_early_for_beta: number | null
  self_paced: boolean
  username: string
  user_id: number
  at_time: string
  outline: SequenceOutline
}

export interface SequenceOutline {
  sections: Section[]
  sequences: { [key: string]: Sequence }
}

export interface Section {
  id: string
  title: string
  sequence_ids: string[]
  start: string | null
  effective_start: string
}

export interface Sequence {
  id: string
  title: string
  accessible: boolean
  inaccessible_after_due: boolean
  start: string | null
  effective_start: string
  due: string | null
}

export interface Block {
  children: string[]
  childrenBlocks?: Block[]
  complete: boolean
  description: string | null
  display_name: string
  due: string | null
  effort_activities: string | null
  effort_time: string | null
  icon: string | null
  id: string
  lms_web_url: string | null
  resume_block: boolean
  type: string
  has_scheduled_content: boolean
  hide_from_toc: boolean
  completion_stat: {
    completion: number
    completable_children: number
  }
}

export interface CourseBlockData {
  blocks: {
    [key: string]: Block
  }
}
