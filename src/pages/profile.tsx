import Loading from '@/components/loading'
import UserProfile from '@/components/user-profile'
import ROUTES from '@/constants/routes'
import { useUserStore } from '@/hooks/use-user-store'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Profile = () => {
  const { username } = useParams()
  const { user, loading } = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || !username) { 
      navigate(ROUTES.NOT_FOUND)
    }
  }, [loading, user, navigate, username])

  if (loading || !user || !username) return <Loading className='z-50' />;

  return (
    <div className='sm:mt-7'>
      <div className='mx-auto max-w-screen-md  border-gray-300'>
        <UserProfile userId={user.userId} username={username} />
      </div>
    </div>
  )
}

export default Profile