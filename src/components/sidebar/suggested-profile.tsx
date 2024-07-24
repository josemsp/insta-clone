import { updateFollowingUsersByUserId } from "@/services";
import { useState } from "react"
import { Link } from "react-router-dom";
import Image from "../image";
import { AVATAR_PATH, PROFILE_PATH } from "@/constants";

export interface SuggestedProfileProps {
  userDocId: string
  username: string;
  profileId: string;
  userId: string
}

const SuggestedProfile = ({ username, profileId, userId }: SuggestedProfileProps) => {
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
            <Image
              className="rounded-full w-8 flex h-8"
              src={AVATAR_PATH(username)}
              onError={(e) => {
                e.currentTarget.src = AVATAR_PATH('default', 'png')
              }}
            />
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