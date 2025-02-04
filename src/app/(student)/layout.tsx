import StudentFooter from '@/components/student/Footer'
import StudentAppBar from '@/components/student/Header'
import { FunctionComponent, PropsWithChildren } from 'react'

const StudentLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <main className='flex flex-col min-h-screen'>
      <StudentAppBar />
      <div className='flex-grow flex justify-center bg-primary-light'>
        <div className='flex flex-col justify-center items-center max-w-7xl w-full'>
          <div className='flex py-6 md:py-10 px-4 w-full'>
            {children}
          </div>
        </div>
      </div>
      <StudentFooter />
    </main>
  )
}

export default StudentLayout
