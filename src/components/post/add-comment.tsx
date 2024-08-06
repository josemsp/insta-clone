import { addCommentToPhoto } from "@/services/firebase";
import React, { useState } from "react";
import Input from "../Input";
import { useUserStore } from "@/hooks/use-user-store";

interface Props {
  commentInput?: React.RefObject<HTMLInputElement>;
  docId: string;
}

const AddComment = ({ docId, commentInput }: Props) => {
  const [comment, setComment] = useState('');
  const { user } = useUserStore();

  const handleSetComment = (value: string) => {
    setComment(value)
  }

  const handleSubmitComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!comment.length || !user?.username) return;

    await addCommentToPhoto({ comment, displayName: user?.username, photoId: docId })
    setComment('');
  };

  return (
    <form
      className="flex justify-between pl-0 pr-5"
      method="POST"
      onSubmit={handleSubmitComment}
    >
      <Input
        aria-label="Add a comment"
        autoComplete="off"
        className="text-sm text-gray-base w-full mr-3 py-5 px-4"
        type="text"
        name={`add-comment-${docId}`}
        placeholder="Add a comment..."
        value={comment}
        onChange={handleSetComment}
        ref={commentInput}
      />
      <button
        className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
        disabled={comment.length < 1}
      >
        Post
      </button>
    </form>
  );
}

export default AddComment