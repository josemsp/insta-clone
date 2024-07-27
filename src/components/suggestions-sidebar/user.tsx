import Skeleton from "react-loading-skeleton"
import { Link } from "react-router-dom"
import { PROFILE_PATH } from "@/constants/paths"
import Avatar from "../avatar"

const User = ({ photoUrl, username, fullName }: { photoUrl?: string, username?: string, fullName?: string }) =>
  photoUrl && username && fullName ? (
    <Link
      to={PROFILE_PATH(username)}
      className="flex gap-5 "
    >
      <Avatar photoUrl={photoUrl} className="w-16 h-16" />
      <div className="flex flex-col justify-center w-full">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  ) : (
    <Skeleton height={61} className="w-fit" />
  )

export default User