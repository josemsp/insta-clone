import { Link } from 'react-router-dom'
import Image from '../image'
import { AVATAR_PATH, PROFILE_PATH } from '@/constants'

const Header = ({ username }: { username: string }) => {
  return (
    <div className='flex border-b border-gray-300 h-4 p-4 py-8'>
      <div className='flex items-center'>
        <Link to={PROFILE_PATH(username)} className='flex items-center'>
          <Image
            className='rounded-full h-8 w-8 flex mr-3'
            src={AVATAR_PATH(username)}
            alt={`${username} profile picture`}
          />
          <p className='font-bold'>{username}</p>
        </Link>
      </div>
    </div>
  )
}

export default Header