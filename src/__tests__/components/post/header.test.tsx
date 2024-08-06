import { renderWithRouter } from "@/__tests__/utils/renderWithRouter";
import Header from "@/components/post/header";
import { PROFILE_PATH } from "@/constants/paths";

describe('Header Component', () => {
  const mockProps = {
    photoUrl: 'http://example.com/photo.jpg',
    username: 'username',
  };

  it('renders correctly with given props', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Header {...mockProps} />
    );

    const usernameElement = getByText(mockProps.username);
    expect(usernameElement).toBeInTheDocument();

    const linkElement = getByRole('link');
    expect(linkElement).toHaveAttribute('href', PROFILE_PATH(mockProps.username));

    const avatarElement = getByRole('img');
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveAttribute('src', mockProps.photoUrl);
  });
});
