import { lazy, Suspense } from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import ROUTES from "./constants/routes"
import { AuthProvider } from "./context"
import ProtectedRoute from "./helpers/protected-route"
import Loading from "./components/Loading"

const Dashboard = lazy(() => import('@/pages/dashboard'))
const Login = lazy(() => import('@/pages/login'))
const SignUp = lazy(() => import('@/pages/sign-up'))
const Profile = lazy(() => import('@/pages/profile'))
const ErrorPage = lazy(() => import('@/pages/error-page'))
const NotFound = lazy(() => import('@/pages/not-found'))

function App() {

  return (
    <HashRouter>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} errorElement={<ErrorPage />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} errorElement={<ErrorPage />} />
            <Route path={ROUTES.LOGIN} element={<Login />} errorElement={<ErrorPage />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} errorElement={<ErrorPage />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </HashRouter>
  )
}

export default App
