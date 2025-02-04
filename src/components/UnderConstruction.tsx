import { FunctionComponent } from 'react'

const UnderConstruction: FunctionComponent = () => {
  return (
    <div className='flex flex-col justify-center items-center my-10'>
      <div className='text-4xl font-bold text-white text-center'>Page under construction</div>
      <img src='/under-construction.png' alt='under construction' className='md:w-1/2 object-contain' />
    </div>
  )
}

export default UnderConstruction
