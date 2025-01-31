import { FunctionComponent } from 'react'

const AboutPage: FunctionComponent = () => {
  return (
    <div className='h-full w-full text-white'>
      <h2 className='text-xl pb-4 font-bold'>
        About LearnX
      </h2>
      <p className='pb-4'>
        Welcome to LearnX, a dynamic online learning platform that empowers educators and students alike. Built on the robust Tutor and Open edX frameworks and deployed on AWS, LearnX offers a seamless and secure environment for educational growth. Our platform allows teachers to share their knowledge by uploading courses, and students can easily join and learn at their own pace, much like other leading platforms such as Coursera and Udemy.
      </p>
      <h2 className='text-xl pb-4 font-bold'>
        Supernova Leadership Initiative
      </h2>
      <p className='pb-4'>
        LearnX is proudly supported by the Supernova Leadership Initiative, a prestigious program organized by DXMongolia. This initiative is dedicated to nurturing the next generation of leaders in Space Technology and Information Communication. Offered to aspiring students with dreams of contributing to Japan's technological advancements, the Supernova Leadership Initiative provides unparalleled training opportunities and resources.
      </p>
      <h2 className='text-xl pb-4 font-bold'>
        Join Us
      </h2>
      <p className='pb-4'>
        At LearnX, we believe in the power of knowledge and its ability to transform lives. Join our community of learners and educators today, and be part of a platform that’s shaping the future of education.
      </p>
    </div>
  )
}

export default AboutPage
