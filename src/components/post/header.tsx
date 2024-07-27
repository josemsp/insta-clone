import { Link } from 'react-router-dom'
import { PROFILE_PATH } from '@/constants/paths'
import Avatar from '../avatar'

const Header = ({ photoUrl, username }: { photoUrl: string, username: string }) => {
  return (
    <div className='flex h-4 p-4 py-8'>
      <div className='flex items-center'>
        <Link to={PROFILE_PATH(username)} className='flex items-center gap-3'>
          <Avatar photoUrl={photoUrl} className='h-8 w-8' />
          <p className='font-bold'>{username}</p>
        </Link>
      </div>
    </div>
  )
}

export default Header