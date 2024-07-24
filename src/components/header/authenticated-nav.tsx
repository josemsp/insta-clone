import { Link } from 'react-router-dom'
import HomeIcon from '@/assets/icons/home.svg?react'
import OutsideIcon from '@/assets/icons/outside.svg?react'
import ROUTES from '@/constants/routes'
import { AVATAR_PATH, PROFILE_PATH } from '@/constants'
import { logOut } from '@/services'
import Image from '../image'

const AuthenticatedNav = ({ username }: { username: string }) => {

  const handleSignOut = () => logOut()

  return (
    <>
      <Link to={ROUTES.DASHBOARD} aria-label='Dashboard' title='Home'>
        <HomeIcon className='h-[1.5rem] w-[1.5rem]' />
      </Link>
      <button onClick={handleSignOut} title='Sign Out'>
        <OutsideIcon className='h-[1.5rem] w-[1.5rem]' />
      </button>
      <div className="flex items-center cursor-pointer">
        <Link to={PROFILE_PATH(username)}>
          <Image
            className='rounded-full h-8 w-8 flex'
            src={AVATAR_PATH(username)}
            alt={`${username} profile picture`}
          />
        </Link>
      </div>
    </>
  )
}

export default AuthenticatedNav