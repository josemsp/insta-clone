import { Link } from 'react-router-dom'
import { PROFILE_PATH } from '@/constants/paths'
import Avatar from '../avatar'

const Header = ({ photoUrl, username }: { photoUrl: string, username: string }) => {
  return (
    <header className='flex items-center mb-4'>
      <Link to={PROFILE_PATH(username)} className='flex items-center gap-3'>
        <Avatar photoUrl={photoUrl} className='h-8 w-8' />
        <p className='font-bold'>{username}</p>
      </Link>
    </header>
  )
}

export default Header