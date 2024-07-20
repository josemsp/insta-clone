import { getSuggestedProfiles, UserData } from "@/services"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import SuggestedProfile from "./suggested-profile"

const Suggestions = ({ userId, following }: { userId?: string, following?: string[] }) => {
  const [profiles, setProfiles] = useState([] as UserData[])

  useEffect(() => {
    if (userId && following) {
      getSuggestedProfiles({ following, userId })
        .then(result => {
          setProfiles(result)
        })
    }

    return () => {
    }
  }, [userId, following])

  console.log('profiles', profiles, profiles.length, userId)

  return (
    <>
      {
        profiles.length && userId ? (
          <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-middle justify-between mb-2">
              <p className="font-bold text-gray-500">Suggestions for you</p>
            </div>
            <div className="mt-4 grid gap-5">
              {profiles.map(p => (
                <SuggestedProfile
                  key={p.docId}
                  userDocId={p.docId}
                  username={p.username}
                  profileId={p.userId}
                  userId={userId}
                />
              ))}
            </div>
          </div>
        ) : <Skeleton height={150} className="mt-5" />
      }
    </>
  )
}

export default Suggestions