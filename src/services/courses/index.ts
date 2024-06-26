import { GetCoursesResponse, UseCourse } from './types'
import axios from 'axios'

const useCourse = (): UseCourse => {
  return {
    getCourses: async (req) => {
      const page = req.page ?? ''
      const page_size = req.page_size ?? ''
      const res = await axios.get<GetCoursesResponse>(`/api/course?page=${page}&page_size=${page_size}`);
      return res.data
    }
  }
}

export default useCourse