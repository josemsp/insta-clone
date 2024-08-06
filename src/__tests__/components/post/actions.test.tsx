import { renderWithRouter } from "@/__tests__/utils/renderWithRouter";
import Actions from "@/components/post/actions";

describe('Actions Component', () => {
  const mockProps = {
    docId: 'docId',
    totalLikes: 10,
    likedPhoto: true,
    handleFocus: () => {},
  };

  it('renders correctly', () => {
    const { container } = renderWithRouter(
      <Actions {...mockProps} />
    );

    expect(container).toBeInTheDocument();
  });

  it('renders heart icon', () => {
    const { container } = renderWithRouter(
      <Actions {...mockProps} />
    );

    const heartIcon = container.querySelector('svg[data-icon-name="heart"]');
    expect(heartIcon).toBeInTheDocument();
  });

  it('renders chat-oval icon', () => {
    const { container } = renderWithRouter(
      <Actions {...mockProps} />
    );

    const chatBubbleIcon = container.querySelector('svg[data-icon-name="chat-oval"]');
    expect(chatBubbleIcon).toBeInTheDocument();
  });

  it('likes of photo', async () => {
    const { getByText } = renderWithRouter(
      <Actions {...mockProps} />
    );

    expect(getByText('10 likes')).toBeInTheDocument();
  });

});
