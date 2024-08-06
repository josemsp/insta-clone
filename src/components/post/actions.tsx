import { updateLikes } from "@/services/firebase";
import { useCallback, useState } from "react";
import HeartIcon from '@/assets/icons/heart.svg?react'
import ChatOvalIcon from '@/assets/icons/chat-oval.svg?react'
import { useUserStore } from "@/hooks/use-user-store";

interface Props {
  docId: string;
  totalLikes: number;
  likedPhoto: boolean;
  handleFocus: () => void
}

const Actions = ({ docId, handleFocus, likedPhoto, totalLikes }: Props) => {
  const { user } = useUserStore()
  const [toggleLiked, setToggleLiked] = useState(likedPhoto)

  const handleToggleLiked = useCallback(async () => {
    console.log('handleToggleLiked',user)
    if (user) {
      const newToggleLiked = !toggleLiked;
      setToggleLiked(newToggleLiked);
      await updateLikes({ photoId: docId, toggleLiked: newToggleLiked, userId: user.userId })
    }
  }, [docId, user, toggleLiked])

  return (
    <>
      <div className="flex justify-between px-4 pt-4">
        <div className="flex gap-3">
          <HeartIcon
            className={`w-[1.5rem] h-[1.5rem] select-none cursor-pointer ${toggleLiked ? 'fill-red-500 text-red-500' : 'text-black'}`}
            onClick={handleToggleLiked}
          />
          <ChatOvalIcon
            className="w-[1.5rem] h-[1.5rem] text-black-light select-none cursor-pointer focus:outline-none"
            onClick={handleFocus}
          />
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font-semibold">{`${totalLikes} like${totalLikes == 1 ? '' : 's'}`}</p>
      </div>
    </>
  )
}

export default Actions