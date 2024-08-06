import { renderWithRouter } from "@/__tests__/utils/renderWithRouter";
import Comments from "@/components/post/comments";
import { fireEvent } from "@testing-library/react";
import { addHours } from "date-fns";
import React from "react";

const comment1Date = new Date();
const comment2Date = addHours(new Date(), 1);
const mockProps = {
  docId: 'docId',
  comments: [
    { comment: 'First comment', displayName: 'displayName', dateCreated: comment1Date },
    { comment: 'Second comment', displayName: 'displayName 2', dateCreated: comment2Date },
  ],
  commentInput: { current: null },
};

interface Comment {
  comment: string;
  displayName: string;
  dateCreated: Date;
}

interface Props {
  docId?: string;
  comments?: Comment[];
  commentInput?: React.RefObject<HTMLInputElement>;
}

const renderComments = (props?: Props) => {
  return renderWithRouter(
    <Comments {...mockProps} {...props} />
  );
}

describe('Comments Component', () => {

  it('renders correctly', () => {
    const { container } = renderComments();

    expect(container).toBeInTheDocument();
  });

  it('should render all comments when showAllComments is true', () => {
    const { getByText, queryByText } = renderComments();

    fireEvent.click(getByText('View all 2 comments'));

    expect(queryByText('First comment')).toBeInTheDocument();
    expect(queryByText('Second comment')).toBeInTheDocument();
  });

  it('should render no comments when showAllComments is false', () => {
    const { queryByText } = renderComments();

    expect(queryByText('First comment')).not.toBeInTheDocument();
    expect(queryByText('Second comment')).not.toBeInTheDocument();
  });

  it('should handle empty comments array gracefully', () => {
    const { queryByText } = renderComments({ comments: [] });

    expect(queryByText('View all 0 comments')).not.toBeInTheDocument();
  });

});