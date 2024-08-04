import { Route, Routes } from "react-router-dom";
import { fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { userDataMock, userPassword } from "__mocks__/user-data-mock";
import { renderWithRouter } from "../utils/renderWithRouter";
import SignUp from "@/pages/sign-up";
import ROUTES from "@/constants/routes";
// import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";

const renderLogin = () => {
  return renderWithRouter(
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
      {/* <Route path={ROUTES.DASHBOARD} element={<Dashboard />} /> */}
      <Route path={ROUTES.DASHBOARD} element={<div>Dashboard</div>} />
    </Routes>,
    ROUTES.LOGIN
  );
}

describe('Login Component', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form correctly', () => {
    const { getByPlaceholderText, getByRole } = renderLogin();

    expect(getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Log In' })).toBeInTheDocument();
  });

  it('updates input fields on change', () => {
    const { getByPlaceholderText } = renderLogin();

    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');
    const emailVale = 'jose@email.com';
    const passwordValue = 'password123';

    fireEvent.change(emailInput, { target: { value: emailVale } });
    fireEvent.change(passwordInput, { target: { value: passwordValue } });

    expect(emailInput).toHaveValue(emailVale);
    expect(passwordInput).toHaveValue(passwordValue);
  });

  it('navigates to dashboard on successful login', async () => {
    const { getByPlaceholderText, getByRole, getByText } = renderLogin();

    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByRole('button', { name: /log in/i });

    fireEvent.change(emailInput, { target: { value: userDataMock.emailAddress } });
    fireEvent.change(passwordInput, { target: { value: userPassword } });

    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(getByText('Dashboard')).toBeInTheDocument();
    });

  });

  it('navigates to sign up page on successful login', async () => {
    const { getByRole } = renderLogin();

    const signUpLink = getByRole('link', { name: /sign up/i });
    await userEvent.click(signUpLink);

    await waitFor(() => {
      expect(getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
      expect(getByRole('link', { name: /log in/i })).toBeInTheDocument();
    });

  });

  it('displays error message when login fails', async () => {
    const errorMessage = 'All fields are required.';
    const { getByRole, getByText } = renderLogin();

    await userEvent.click(getByRole('button', { name: 'Log In' }));

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeInTheDocument();
    });
  });
});