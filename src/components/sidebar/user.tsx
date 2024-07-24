import Skeleton from "react-loading-skeleton"
import { Link } from "react-router-dom"
import Image from "../image"
import { AVATAR_PATH, PROFILE_PATH } from "@/constants"

const User = ({ username, fullName }: { username?: string, fullName?: string }) =>
  username && fullName ? (
    <Link
      to={PROFILE_PATH(username)}
      className="flex gap-5 "
    >
      <Image
        className="rounded-full w-16 h-16 "
        src={AVATAR_PATH(username)}
        alt=""
      />
      <div className="flex flex-col justify-center w-full">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  ) : (
    <Skeleton height={61} className="w-fit" />
  )

export default User