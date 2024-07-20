import ROUTES from "@/constants/routes";
import { updateFollowingUsersByUserId, UserData } from "@/services";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export interface SuggestedProfileProps {
  userDocId: string
  username: string;
  profileId: string;
  userId: string
}

const SuggestedProfile = ({ userDocId, username, profileId, userId }: SuggestedProfileProps) => {
  const [followed, setFollowed] = useState(false)

  useEffect(() => {
    // console.log('first', userId)
    // updateFollowingUsersByUserId({ follow: true, userId: 'Q20oWDOb5ShvN03xIgr9L562G6X2', userIdToFollow: userId }).catch(err => console.log('err', err))
    // console.log('dos')

    return () => {

    }
  }, [])


  const handleFollowerUser = async () => {
    setFollowed(true)
    await updateFollowingUsersByUserId({ follow: true, userId, userIdToFollow: profileId })
    // remove because you can follow but the other person not
    await updateFollowingUsersByUserId({ follow: true, userId: profileId, userIdToFollow: userId })
  }

  console.log('username', username)

  return (
    <>
      {!followed ?
        <div className="flex flex-row items-center align-middle justify-between">
          <div className="flex items-center justify-between">
            <img
              className="rounded-full w-8 flex mr-3 h-8"
              src={`/images/avatars/${username}z.jpg`}
              alt=""
              onError={(e) => {
                e.currentTarget.src = '/images/avatars/default.png'
              }}
            />
            <Link to={`${ROUTES.PROFILE}/${username}`}>
              <p className="font-bold text-sm">{username}</p>
            </Link>
          </div>
          <button
            className="text-xs font-bold text-blue-500"
            type="button"
            onClick={handleFollowerUser}
          >
            Follow
          </button>
        </div> : null
      }
    </>
  )
}

export default SuggestedProfile