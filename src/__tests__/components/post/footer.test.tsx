import Footer from "@/components/post/footer";
import { render } from "@testing-library/react";
import { formatDistance } from "date-fns";

describe('Footer Component', () => {
  const datePosted = new Date();
  const mockProps = {
    caption: 'caption',
    username: 'username',
    dateCreated: datePosted,
  };

  it('renders correctly', () => {
    const { container } = render(<Footer {...mockProps} />);

    expect(container).toBeInTheDocument();
  });

  it('renders username', () => {
    const { getByText } = render(<Footer {...mockProps} />);
    const usernameElement = getByText(mockProps.username);
    expect(usernameElement).toBeInTheDocument();
  });

  it('renders caption', () => {
    const { getByText } = render(<Footer {...mockProps} />);
    const captionElement = getByText(mockProps.caption);
    expect(captionElement).toBeInTheDocument();
  });

  it('renders date created', () => {
    const { getByText } = render(<Footer {...mockProps} />);

    const currentDate = new Date();
    const dateCreatedElement = getByText(formatDistance(mockProps.dateCreated, currentDate));
    expect(dateCreatedElement).toBeInTheDocument();
  });

});