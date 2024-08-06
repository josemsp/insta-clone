import AddComment from "@/components/post/add-comment";
import { fireEvent, render } from "@testing-library/react";

describe('Add Comment Component', () => {
  it('renders correctly', () => {
    const { container , getByRole } = render(<AddComment docId="docId" />);

    const inputElement = getByRole('textbox', { name: /add a comment/i });
    expect(container).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  it('type a comment', () => {
    const { getByRole } = render(<AddComment docId="docId" />);
    const inputElement = getByRole('textbox', { name: /add a comment/i });
    fireEvent.change(inputElement, { target: { value: 'comment' } });

    expect(inputElement).toHaveValue('comment');
  });

});