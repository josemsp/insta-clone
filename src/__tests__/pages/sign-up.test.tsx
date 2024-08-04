import { Route, Routes } from 'react-router-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { userDataMock, userPassword } from '__mocks__/user-data-mock';
import SignUp from '@/pages/sign-up';
import ROUTES from '@/constants/routes';
import { renderWithRouter } from '../utils/renderWithRouter';
import Login from '@/pages/login';
// import Dashboard from '@/pages/dashboard';

const renderSignUp = () => {
  return renderWithRouter(
    <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
      {/* <Route path={ROUTES.DASHBOARD} element={<Dashboard />} /> */}
      <Route path={ROUTES.DASHBOARD} element={<div>Dashboard</div>} />
    </Routes>,
    ROUTES.SIGN_UP
  );
};

describe('SignUp Component', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders signup form correctly', () => {
    const { getByPlaceholderText, getByRole } = renderSignUp();

    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Full name')).toBeInTheDocument();
    expect(getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  it('updates input fields on change', () => {
    const { getByPlaceholderText } = renderSignUp();

    const usernameInput = getByPlaceholderText('Username');
    const fullNameInput = getByPlaceholderText('Full name');
    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(usernameInput, { target: { value: userDataMock.username } });
    fireEvent.change(fullNameInput, { target: { value: userDataMock.fullName } });
    fireEvent.change(emailInput, { target: { value: userDataMock.emailAddress } });
    fireEvent.change(passwordInput, { target: { value: userPassword } });

    expect(usernameInput).toHaveValue(userDataMock.username);
    expect(fullNameInput).toHaveValue(userDataMock.fullName);
    expect(emailInput).toHaveValue(userDataMock.emailAddress);
    expect(passwordInput).toHaveValue(userPassword);
  });

  it('navigates to dashboard on successful signup', async () => {
    const { getByPlaceholderText, getByRole, getByText } = renderSignUp();

    const usernameInput = getByPlaceholderText('Username');
    const fullNameInput = getByPlaceholderText('Full name');
    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');
    const signUpButton = getByRole('button', { name: /sign up/i });

    fireEvent.change(usernameInput, { target: { value: userDataMock.username } });
    fireEvent.change(fullNameInput, { target: { value: userDataMock.fullName } });
    fireEvent.change(emailInput, { target: { value: userDataMock.emailAddress } });
    fireEvent.change(passwordInput, { target: { value: userPassword } });

    await userEvent.click(signUpButton);

    // await waitForElementToBeRemoved(() => getByText('Sign Up'));
    // await waitForElementToBeRemoved(() => screen.getByText('Signing up...'));

    await waitFor(() => {
      expect(getByText('Dashboard')).toBeInTheDocument();
    });
    // await waitFor(() => {
    //   expect(getByText('Dashboard')).toBeInTheDocument();
    // }, { timeout: 2000 }); // Increase timeout if needed

  });

  it('navigates to sign up page on successful login', async () => {
    const { getByRole } = renderSignUp();

    const signUpLink = getByRole('link', { name: /log in/i });
    await userEvent.click(signUpLink);

    await waitFor(() => {
      expect(getByRole('button', { name: 'Log In' })).toBeInTheDocument();
      expect(getByRole('link', { name: /sign up/i })).toBeInTheDocument();
    });

  });

  it('displays error message when signup fails', async () => {
    const errorMessage = 'All fields are required.';
    const { getByRole, getByText } = renderSignUp();

    fireEvent.click(getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeInTheDocument();
    });
  });

});