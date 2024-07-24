import Header from '@/components/header'
import UserProfile from '@/components/user-profile'
import ROUTES from '@/constants/routes'
import useUser from '@/hooks/use-user'
import { getUserProfileByUsername, UserProfileData } from '@/services'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState<UserProfileData>()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { username } = useParams()
  const { userData } = useUser()

  useEffect(() => {
    const getUserData = async () => {
      if (!username || !userData) return;

      try {
        setIsLoading(true)
        const fetchedUser = await getUserProfileByUsername({ loggedUserId: userData.userId, username })

        if (fetchedUser) {
          setUser(fetchedUser)
          setIsLoading(false)
        } else {
          navigate(ROUTES.NOT_FOUND)
        }
      } catch (error) {
        navigate(ROUTES.NOT_FOUND)
      }
    }

    getUserData()
  }, [userData, username, navigate])

  return (
    <div className=''>
      <Header />
      <div className='mx-auto max-w-screen-md  border-gray-300'>
        <UserProfile user={user} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default Profile