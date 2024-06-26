import { Course, Pagination } from '@/utils/data-types'

export interface GetCoursesResponse {
  results: Course[]
  pagination: Pagination
}

export interface GetCoursesRequest {
  page?: number
  page_size?: number
}

export interface UseCourse {
  getCourses: (req: GetCoursesRequest) => Promise<GetCoursesResponse>
}
