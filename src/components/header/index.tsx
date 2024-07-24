import ROUTES from '@/constants/routes'
import { Link } from 'react-router-dom'
import useAuth from '@/hooks/use-auth'
import AuthenticatedNav from './authenticated-nav'
import UnauthenticatedNav from './unauthenticated-nav'
import Image from '../image'

const Header = () => {
  const { user } = useAuth()

  return (
    <header className='h-16 bg-white border-b border-gray-300 mb-8'>
      <div className="container mx-auto max-w-screen-lg h-full px-5 md:px-0">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-middle cursor-pointer w-[6rem]">
            <Link to={ROUTES.DASHBOARD}>
              <Image src='/images/logo.png' alt='Insta Clone' className='' />
            </Link>
          </div>
          <nav className="text-gray-700 text-center flex items-center align-middle gap-5">
            {
              user ? <AuthenticatedNav username={user.displayName || ''} /> :
                <UnauthenticatedNav />
            }
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header