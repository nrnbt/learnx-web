import { isNOU } from '@/utils/null-check'
import { Divider } from '@mui/material'
import { FunctionComponent } from 'react'
import cn from 'classnames'

interface Props {
  className?: string
  dividerColor?: string
}

const CopyRight: FunctionComponent<Props> = ({ dividerColor, className }) => {
  const thisYear = new Date().getFullYear()

  return (
    <div className='flex flex-col w-full max-w-7xl'>
      <div className='flex w-full py-2'>
        <Divider
          className='w-full'
          color={!isNOU(dividerColor) ? dividerColor : 'white'}
        />
      </div>
      <div className={cn('flex w-full justify-end text-end', className)}>
        ©LearnX.mn {thisYear}. All rights reserved. Made by DXMongolia.
      </div>
    </div>
  )
}

export default CopyRight
