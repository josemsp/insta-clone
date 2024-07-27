import { useRef } from "react"
import Image from "../image"
import Actions from "./actions"
import Header from "./header"
import { PhotoWithUserDetails } from "@/services/firebase"
import Footer from "./footer"
import Comments from "./comments"

const Post = ({ content }: { content: PhotoWithUserDetails }) => {
  const commentInput = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    commentInput.current?.focus()
  }

  return (
    <div className="col-span-4 max-w-[470px] border-b border-gray-300 pb-7">
      <Header photoUrl={content.userPhotoUrl} username={content.username} />
      <Image src={content.imageSrc} alt={content.caption} className="rounded-md border-2 object-cover aspect-square" /> 
      <div className="flex flex-col gap-3">
        <Actions
          docId={content.docId}
          totalLikes={content.likes.length}
          likedPhoto={content.userLikedPhoto}
          handleFocus={handleFocus}
        />
        <Footer caption={content.caption} username={content.username} dateCreated={content.dateCreated} />
        <Comments
          docId={content.docId}
          comments={content.comments}
          commentInput={commentInput}
        />
      </div>
    </div>
  )
}

export default Post