import StudentFooter from '@/components/student/Footer'
import StudentAppBar from '@/components/student/Header'
import { FunctionComponent, PropsWithChildren } from 'react'

const StudentLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <main className='flex min-h-screen h-full flex-col'>
      <StudentAppBar />
      <div className='flex justify-center w-full bg-primary-light'>
        <div className='flex flex-col justify-center items-center max-w-7xl w-full'>
          <div className='flex py-5 md:py-10 px-4 w-full'>
            {children}
          </div>
        </div>
      </div>
      <StudentFooter />
    </main>
  )
}

export default StudentLayout
