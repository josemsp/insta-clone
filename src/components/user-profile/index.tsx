import Header from './header'
import Photos from './photos'
import useProfile from '@/hooks/use-profile'

const UserProfile = ({ userId, username }: { userId: string, username: string }) => {
  const { profileData, loading } = useProfile(userId, username)

  return (
    <>
      <Header profile={profileData} isLoading={loading} />
      <Photos profile={profileData} isLoading={loading} />
    </>
  )
}

export default UserProfile
