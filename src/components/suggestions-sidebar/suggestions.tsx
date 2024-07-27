import { getSuggestedProfiles, UserData } from "@/services/firebase"
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
  }, [userId, following])

  return (
    <>
      {
        profiles.length && userId ? (
          <div className="rounded flex flex-col gap-4">
            <div className="text-sm flex items-center align-middle justify-between">
              <p className="font-semibold text-gray-500">Suggestions for you</p>
            </div>
            <div className="grid gap-5">
              {profiles.map(p => (
                <SuggestedProfile
                  key={p.docId}
                  userDocId={p.docId}
                  username={p.username}
                  profileId={p.userId}
                  userId={userId}
                  photoUrl={p.photoUrl}
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