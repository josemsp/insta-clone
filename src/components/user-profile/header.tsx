import { UserProfileData } from '@/services/firebase';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import ROUTES from '@/constants/routes';
import Avatar from '../avatar';
import { useUserStore } from '@/hooks/use-user-store';
import Dropdown from '../dropdown';
import ShowMore from '../show-more';

interface Props {
  profile: UserProfileData | null;
  isLoading: boolean;
}

const Header = ({ profile, isLoading }: Props) => {
  const { user, followUser, unfollowUser } = useUserStore()
  const isUserLogged = user?.userId === profile?.userId;
  // the user is following the profile?
  const userIsFollowingProfile = user?.following.includes(profile?.userId ?? '');
  // the profile is following the user?
  const profileIsFollowingUser = profile?.following.includes(user?.userId ?? '');

  const handleToggleFollow = async (value: string) => {
    if (!user || !profile) return;
    if (value == 'Unfollow') {
      await unfollowUser(profile.userId)
    } else {
      await followUser(profile.userId)
    }
  }

  const handleFollowUser = async () => {
    if (!user || !profile) return;
    await followUser(profile.userId)
  }

  const renderFollowButton = () => {
    if (isUserLogged) {
      return (
        <Link to={ROUTES.EDIT_PROFILE}>
          <button className='bg-gray-300 rounded-lg px-4 py-1'>Edit profile</button>
        </Link>
      );
    }

    if (userIsFollowingProfile) {
      return <Dropdown
        className='border-0'
        options={[{ label: 'Unfollow', onClick: handleToggleFollow }]}
        toggleContent={'Following'}
      />
    }

    if (profileIsFollowingUser) {
      return <button onClick={handleFollowUser} className='bg-blue-500 text-white rounded-lg px-4 py-1'>Follow Back</button>;
    }

    return <button onClick={handleFollowUser} className='bg-blue-500 text-white rounded-lg px-4 py-1'>Follow</button>;
  };

  return (
    <header className='grid grid-cols-[120px,1fr] md:grid-cols-[1fr,2fr] '>
      <section className='row-start-1 col-start-1 row-end-3 md:row-end-5'>
        <div className='flex justify-center items-center flex-grow'>
          {profile?.username ? (
            <Avatar photoUrl={profile?.photoUrl} className='h-[77px] w-[77px] md:h-[150px] md:w-[150px]' />
          ) : (
            <Skeleton circle containerClassName='h-[77px] w-[77px] md:h-[150px] md:w-[150px]' className='h-[77px] w-[77px] md:h-[150px] md:w-[150px]' />
          )}
        </div>
      </section>
      <section className='row-start-1 col-start-2'>
        <div className='flex flex-col md:flex-row md:gap-5'>
          {isLoading ? (
            <Skeleton height={33} containerClassName='w-full' />
          ) : (
            <>
              <div className=''>
                <p className='text-xl'>{profile?.username}</p>
              </div>
              <div>
                {renderFollowButton()}
              </div>
            </>
          )}
        </div>
      </section>
      <section className='row-start-6 col-start-1 col-end-3 md:row-start-2 md:col-start-2'>
        {isLoading ? (
          <Skeleton containerClassName='w-full' className='text-2xl leading-6' />
        ) : (
          <ul className="flex flex-row justify-around md:justify-start items-center py-3 gap-3">
            <li className='flex flex-col md:flex-row justify-center items-center md:gap-1.5'>
              <span>{profile?.postsNum}</span>
              <span>posts</span>
            </li>
            <li className='flex flex-col md:flex-row justify-center items-center md:gap-1.5'>
              <span>{profile?.followers.length}</span>
              <span>followers</span>
            </li>
            <li className='flex flex-col md:flex-row justify-center items-center md:gap-1.5'>
              <span>{profile?.following.length}</span>
              <span>following</span>
            </li>
          </ul>
        )}
      </section>
      <section className='row-start-4 col-start-1 col-end-3 md:row-start-3 md:col-start-2'>
        {isLoading ? (
          <>
            <Skeleton className='text-xl ' />
            <Skeleton height={70} />
          </>
        ) : (
          <div>
            <p className=''>{profile?.fullName}</p>
            <ShowMore text={profile?.bio || 'No bio'} maxLength={120} />
          </div>
        )}
      </section>
      <section className='row-start-2 col-start-2 col-end-3 md:row-start-4'>
      </section>
      <section className='row-start-5 col-start-1 col-end-3 md:row-start-6'>
      </section>
      <section className='row-start-3 col-start-1 col-end-3 md:row-start-5 mt-6 md:mt-11'>
      </section>
    </header>
  )
}

export default Header
