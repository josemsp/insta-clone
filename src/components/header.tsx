import ROUTES from '@/constants/routes'
import { useAuth } from '@/hooks'
import { Link } from 'react-router-dom'
import HomeIcon from '@/assets/icons/home.svg?react'
import OutsideIcon from '@/assets/icons/outside.svg?react'
import { logOut } from '@/services'

const Header = () => {
  const { user } = useAuth()
  console.log('user', user)
  
  const handleSignOut = () => logOut()

  return (
    <header className='h-16 bg-white border-b border-gray-300 mb-8'>
      <div className="container mx-auto max-w-screen-lg h-full px-5 md:px-0">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-middle cursor-pointer">
            <h1 className='flex justify-center w-full'>
              <Link to={ROUTES.DASHBOARD}>
                <img src='/images/logo.png' alt='Insta Clone' className='mt-2 w-6/12' />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-middle gap-5">
            {
              user ? (<>
                <Link to={ROUTES.DASHBOARD} aria-label='Dashboard' title='Home'>
                  <HomeIcon className='h-[1.5rem] w-[1.5rem]' />
                </Link>
                <button onClick={handleSignOut} title='Sign Out'>
                  <OutsideIcon className='h-[1.5rem] w-[1.5rem]' />
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link to={`${ROUTES.PROFILE}/${user.displayName}`}>
                    <img
                      className='rounded-full h-8 w-8 flex'
                      src={`/images/avatars/${user.displayName}.jpg`}
                      alt={`${user.displayName} profile picture`}
                    />
                  </Link>
                </div>
              </>) :
                <>
                  <Link to={ROUTES.LOGIN}>
                    <button
                      className='bg-blue-500 font-bold text-sm rounded text-white w-20 h-8'
                    >Log In</button>
                  </Link>
                  <Link to={ROUTES.SIGN_UP}>
                    <button
                      className='font-bold text-sm rounded text-blue-500 w-20 h-8'
                    >Sign Up</button>
                  </Link>
                </>
            }
          </div>
        </div>
      </div>
    </header>
  )
}

// Header.whyDidYouRender = true;

export default Header