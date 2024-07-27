import { formatDistance } from "date-fns";
import { useMemo, useState } from "react"
import { Link } from "react-router-dom";
import AddComment from "./add-comment";
import { PROFILE_PATH } from "@/constants/paths";

interface Comment {
  comment: string;
  displayName: string;
  dateCreated: Date;
}

interface Props {
  docId: string;
  comments: Comment[];
  commentInput: React.RefObject<HTMLInputElement>;
}

const Comments = ({ docId, comments: allComments, commentInput }: Props) => {
  const [showAllComments, setShowAllComments] = useState(false);

  const commentsToShow = useMemo(() => {
    return showAllComments ? allComments : [];
  }, [allComments, showAllComments]);

  const hasMoreComments = allComments.length > commentsToShow.length;

  const onShowAllComments = () => setShowAllComments(true)

  return (
    <>
      <div className="px-4 flex flex-col gap-4">
        {hasMoreComments && (
          <button
            className="text-sm text-gray-500 font-semibold mb-1 cursor-pointer focus:outline-none w-fit"
            type="button"
            onClick={onShowAllComments}
          >
            View all {allComments.length} comments
          </button>
        )}
        {commentsToShow.map((item) => (
          <div key={`${item.comment}-${item.displayName}`} className="flex flex-col">
            <div className="">
              <Link to={PROFILE_PATH(item.displayName)}>
                <span className="mr-1 font-semibold">{item.displayName}</span>
              </Link>
              <span>{item.comment}</span>
            </div>
            <span className="text-xs text-gray-500">{formatDistance(item.dateCreated, new Date())}</span>
          </div>
        ))}
      </div>
      <AddComment
        docId={docId}
        commentInput={commentInput}
      />
    </>
  )
}

export default Comments