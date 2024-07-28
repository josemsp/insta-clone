import { Navigate } from 'react-router-dom'
import Header from './header'
import Photos from './photos'
import useProfile from '@/hooks/use-profile'
import ROUTES from '@/constants/routes'

const UserProfile = ({ userId, username }: { userId: string, username: string }) => {
  const { profileData, loading } = useProfile(userId, username)

  if(profileData === null && !loading) return <Navigate to={ROUTES.NOT_FOUND} />;

  return (
    <>
      <Header profile={profileData} isLoading={loading} />
      <Photos profile={profileData} isLoading={loading} />
    </>
  )
}

export default UserProfile
