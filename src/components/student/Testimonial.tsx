import { Badge } from '@mui/material'
import { FunctionComponent } from 'react'

interface Props {
    by: string
    text: string
}

const Testimonial: FunctionComponent<Props> = ({ by, text }) => {
    return (
        <Badge
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            badgeContent={<img src='/vectors/msg-icon.svg' />}
            className='w-full'
        >
            <div className='flex flex-col justify-between p-4 rounded-2xl border-secondary border-2'>
                <div className='text-white'>
                    {text}
                </div>
                <div className='text-secondary'>
                    {by}
                </div>
            </div>
        </Badge>
    )
}

export default Testimonial
