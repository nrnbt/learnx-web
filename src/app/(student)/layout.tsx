import StudentFooter from '@/components/student/Footer'
import StudentAppBar from '@/components/student/Header'
import { FunctionComponent, PropsWithChildren } from 'react'

const StudentLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <main className='flex h-screen flex-col'>
      <StudentAppBar />
      <div className='flex justify-center h-full w-full bg-primary-light'>
        <div className='flex flex-col justify-center items-center max-w-7xl h-full w-full'>
          <div className='flex py-5 md:py-10 px-4 w-full h-full'>
            {children}
          </div>
        </div>
      </div>
      <StudentFooter />
    </main>
  )
}

export default StudentLayout
