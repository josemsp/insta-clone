import { renderWithRouter } from "@/__tests__/utils/renderWithRouter";
import Post from "@/components/post";

const mockProps = {
  docId: 'docId',
  imageSrc: 'http://example.com/image.jpg',
  caption: 'caption',
  username: 'username',
  dateCreated: new Date(),
  userPhotoUrl: 'http://example.com/photo.jpg',
  userLikedPhoto: true,
  likes: [],
  comments: [],
  photoId: 'photoId',
  userLongitude: '0',
  userId: 'userId',
  userLatitude: '0',
};

const renderPost = () => {
  return renderWithRouter(<Post content={mockProps} />);
}

describe('Post Component', () => {
  it('renders correctly', () => {
    const { container, getByText } = renderPost();

    expect(container).toBeInTheDocument();
    expect(getByText('0 likes')).toBeInTheDocument();
  });

});