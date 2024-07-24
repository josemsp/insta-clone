import ROUTES from '@/constants/routes'
import { Link } from 'react-router-dom'

const UnauthenticatedNav = () => {
  return (
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
  )
}

export default UnauthenticatedNav