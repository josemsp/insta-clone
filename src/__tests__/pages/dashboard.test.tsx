import ROUTES from "@/constants/routes";
import Dashboard from "@/pages/dashboard";
import { renderWithRouter } from "../utils/renderWithRouter";

const renderDashboard = (initialPath = '') => {
  return renderWithRouter(
    <Dashboard />,
    initialPath || ROUTES.DASHBOARD
  );
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders dashboard correctly', () => {
    const { container } = renderDashboard();

    expect(document.title).toBe('Insta Clone - Dashboard');
    expect(container).toBeInTheDocument();
  });
});

// describe('Dashboard Component - Timeline', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   // it('renders timeline correctly', () => {
//   //   const { container, getByText } = renderDashboard();

//   //   expect(document.title).toBe('Insta Clone - Dashboard');
//   //   expect(container).toBeInTheDocument();
//   //   // expect(getByText('Dashboard')).toBeInTheDocument();

//   //   // console.log(container)
//   //   // console.log(container)
//   //   // expect(screen.getAllByText(/Suggestions for you/i)).toBeInTheDocument();
//   // });

// });
