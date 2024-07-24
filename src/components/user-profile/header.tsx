import { UserProfileData } from '@/services';
import Image from '../image';
import { AVATAR_PATH } from '@/constants';
import Skeleton from 'react-loading-skeleton';
import useUser from '@/hooks/use-user';
import { Link } from 'react-router-dom';
import ROUTES from '@/constants/routes';

interface Props {
  profile?: UserProfileData;
  isLoading: boolean;
}

const Header = ({ profile, isLoading }: Props) => {
  // const { username, fullName, userId, postsNum, isFollowing, followers, following } = profile;
  const { userData } = useUser()
  const isUserLogged = userData?.userId === profile?.userId;
  const isFollowingUser = profile?.followers.includes(userData?.userId ?? '');
  const isFollowedByUser = profile?.following.includes(userData?.userId ?? '');

  const handleToggleFollow = () => {

  }

  const renderFollowButton = () => {
    if (isUserLogged) {
      return (
        <Link to={ROUTES.EDIT_PROFILE}>
          <button className='bg-gray-300 rounded-lg px-4 py-1'>Edit profile</button>
        </Link>
      );
    }
    if (isFollowingUser) {
      return <button onClick={handleToggleFollow} className='bg-red-500 text-white rounded-lg px-4 py-1'>Unfollow</button>;
    }
    if (isFollowedByUser) {
      return <button onClick={handleToggleFollow} className='bg-blue-500 text-white rounded-lg px-4 py-1'>Follow Back</button>;
    }
    return <button onClick={handleToggleFollow} className='bg-blue-500 text-white rounded-lg px-4 py-1'>Follow</button>;
  };

  return (
    <header className="flex flex-col">
      <div className='grid grid-cols-3 gap-10'>
        <div className="col-span-3 sm:col-span-1 h-[15rem] flex justify-center items-center">
          {profile?.username ? (
            <Image
              className="rounded-full h-40 w-40"
              alt={`${profile?.fullName} profile picture`}
              src={AVATAR_PATH(profile?.username)}
              onError={(e) => {
                e.currentTarget.src = AVATAR_PATH('default', 'png')
              }}
            />
          ) : (
            <Skeleton circle height={160} width={160} count={1} />
          )}
        </div>
        <div className='col-span-3 sm:col-span-2 flex flex-col gap-5'>
          <div className='flex flex-row gap-6'>
            {isLoading ? (
              <Skeleton height={33} containerClassName='w-full' />
            ) : (
              <>
                <p className='text-xl text-center'>{profile?.username}</p>
                {renderFollowButton()}
              </>
            )}
          </div>
          <div id='account-data' className='flex gap-10 text-base'>
            {isLoading ? (
              <Skeleton containerClassName='w-full' className='text-2xl leading-6' />
            ) : (
              <>
                <span>{profile?.postsNum} posts</span>
                <span>{profile?.followers.length} followers</span>
                <span>{profile?.following.length} following</span>
              </>
            )}
          </div>
          <div className='text-sm font-semibold'>
            {isLoading ? (
              <>
                <Skeleton className='text-xl' />
                <Skeleton height={70} />
              </>
            ) : (
              <>
                <p className=''>{profile?.fullName}</p>
                <span className='text-sm font-normal'>{profile?.bio || 'No bio'}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
