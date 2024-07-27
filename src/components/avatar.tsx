import { AVATAR_PATH } from "@/constants/paths"
import Image from "./image"

interface AvatarProps {
  username?: string;
  photoUrl?: string;
  className?: string;
}

const Avatar = ({ username, photoUrl, className }: AvatarProps) => {
  const handleOnError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = AVATAR_PATH('default', 'png')
  }

  return (
    <Image
      className={`rounded-full ${className}`}
      src={photoUrl || (username ? AVATAR_PATH(username) : AVATAR_PATH('default', 'png'))}
      alt={`${username} profile picture`}
      onError={handleOnError}
    />
  )
}

export default Avatar