import { UserProfileData } from '@/services'
import Header from './header'
import Photos from './photos'

const UserProfile = ({ user, isLoading }: { user?: UserProfileData, isLoading: boolean }) => {

  return (
    <>
      <Header profile={user} isLoading={isLoading} />
      <Photos profile={user} isLoading={isLoading} />
    </>
  )
}

export default UserProfile
