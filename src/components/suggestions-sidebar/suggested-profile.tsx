import { updateFollowingUsersByUserId } from "@/services/firebase";
import { useState } from "react"
import { Link } from "react-router-dom";
import { PROFILE_PATH } from "@/constants/paths";
import Avatar from "../avatar";

export interface SuggestedProfileProps {
  userDocId: string
  username: string;
  profileId: string;
  userId: string;
  photoUrl: string;
}

const SuggestedProfile = ({ photoUrl, username, profileId, userId }: SuggestedProfileProps) => {
  const [followed, setFollowed] = useState(false)

  const handleFollowerUser = async () => {
    setFollowed(true)
    await updateFollowingUsersByUserId({ follow: true, userId, userIdToFollow: profileId })
  }

  return (
    <>
      {!followed ?
        <div className="flex flex-row items-center align-middle justify-between">
          <Link to={PROFILE_PATH(username)} className="flex items-center justify-between gap-4">
            <Avatar photoUrl={photoUrl} className='w-8 h-8' />
            <p className="font-bold text-sm">{username}</p>
          </Link>
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