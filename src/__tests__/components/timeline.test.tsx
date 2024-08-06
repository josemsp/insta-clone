import Timeline from "@/components/timeline";
import { renderWithRouter } from "../utils/renderWithRouter";
import { mockPhotosWithUserDetails, userDataMock } from "__mocks__/user-data-mock";
import { act } from "@testing-library/react";
import { useUserStore } from "@/hooks/use-user-store";

const renderTimeline = () => renderWithRouter(
  <Timeline className="w-full" />
);

vi.mock("@/hooks/use-photos", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    photos: [],
    loading: false,
    error: null
  }))
}));

describe("Timeline", () => {

  beforeEach(() => {
    vi.clearAllMocks();
    act(() => {
      useUserStore.setState({ loading: false, user: null, error: null });
    });
  });

  it("should render successfully", () => {
    const { container } = renderTimeline();
    expect(container).toBeInTheDocument();
  });

  it('should render loading skeleton', async () => {
    vi.mocked((await import("@/hooks/use-photos")).default).mockReturnValue({
      photos: [],
      loading: true,
      error: null,
    });
    const { getByTestId } = renderTimeline();
    expect(getByTestId('skeleton')).toBeInTheDocument();
  });

  it('should render error message', async () => {
    vi.mocked((await import("@/hooks/use-photos")).default).mockReturnValue({
      photos: [],
      loading: false,
      error: 'Error message',
    });
    const { getByText } = renderTimeline();
    expect(getByText(`Error: Error message`)).toBeInTheDocument();
  });

  it('should render user data not available message', async () => {
    vi.mocked((await import("@/hooks/use-photos")).default).mockReturnValue({
      photos: [],
      loading: false,
      error: null,
    });
    // vi.mocked((await import("@/hooks/use-user-store")).useUserStore).mockReturnValue({
    //   loading: false,
    //   user: null,
    //   error: null,
    // });
    act(() => {
      useUserStore.setState({ loading: false, user: null, error: null });
    });

    const { getByText } = renderTimeline();
    expect(getByText(`User data not available`)).toBeInTheDocument();
  });

  it('should render no photos available message', async () => {
    vi.mocked((await import("@/hooks/use-photos")).default).mockReturnValue({
      photos: [],
      loading: false,
      error: null,
    });
    // vi.mocked((await import("@/hooks/use-user-store")).useUserStore).mockReturnValue({
    //   loading: false,
    //   user: userDataMock,
    //   error: null,
    // });
    act(() => {
      useUserStore.setState({ loading: false, user: userDataMock, error: null });
    });

    const { getByText } = renderTimeline();
    expect(getByText(`No photos available`)).toBeInTheDocument();
  });

  it('should render posts', async () => {
    vi.mocked((await import("@/hooks/use-photos")).default).mockReturnValue({
      photos: mockPhotosWithUserDetails,
      loading: false,
      error: null,
    });
    act(() => {
      useUserStore.setState({ loading: false, user: userDataMock, error: null });
    });

    const { getByText } = renderTimeline();
    expect(getByText('mock-caption')).toBeInTheDocument();
  });

});
