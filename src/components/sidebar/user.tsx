import ROUTES from "@/constants/routes"
import Skeleton from "react-loading-skeleton"
import { Link } from "react-router-dom"

const User = ({ username, fullName }: { username?: string, fullName?: string }) =>
  username && fullName ? (
    <Link
      to={`${ROUTES.PROFILE}:${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 h-16 flex mr-3"
          src={`images/avatars/${username}.jpg`}
          alt=""
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  ) : (
    <Skeleton height={61} />
  )

export default User