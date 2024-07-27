import { lazy, Suspense } from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import ROUTES from "./constants/routes"
import ProtectedRoute from "./helpers/protected-route"
import Loading from "./components/loading"
import Layout from "./pages/layout"
import { AuthProvider } from "./context/AuthContext"

const Dashboard = lazy(() => import('@/pages/dashboard'))
const Login = lazy(() => import('@/pages/login'))
const SignUp = lazy(() => import('@/pages/sign-up'))
const Profile = lazy(() => import('@/pages/profile'))
const ErrorPage = lazy(() => import('@/pages/error-page'))
const NotFound = lazy(() => import('@/pages/not-found'))
const EditProfile = lazy(() => import('@/pages/edit-profile'))

function App() {

  return (
    <HashRouter>
      <AuthProvider>
        <Suspense fallback={<Loading />}>

          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} errorElement={<ErrorPage />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} errorElement={<ErrorPage />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path={ROUTES.PROFILE} element={<Profile />} errorElement={<ErrorPage />} />
              <Route path={ROUTES.EDIT_PROFILE} element={<EditProfile />} errorElement={<ErrorPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>

        </Suspense>
      </AuthProvider>
    </HashRouter>
  )
}

export default App
