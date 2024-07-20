import { lazy, Suspense } from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import ROUTES from "./constants/routes"
import { AuthProvider } from "./context"

// import Dashboard from '@/pages/dashboard'
// import Login from '@/pages/login'
// import SignUp from '@/pages/sign-up'

const Dashboard = lazy(() => import('@/pages/dashboard'))
const Login = lazy(() => import('@/pages/login'))
const SignUp = lazy(() => import('@/pages/sign-up'))

function App() {

  return (
    <HashRouter>
      <AuthProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.DASHBOARD} Component={Dashboard} />
            <Route path={ROUTES.LOGIN} Component={Login} />
            <Route path={ROUTES.SIGN_UP} Component={SignUp} />
            <Route path='*' Component={Dashboard} />
            {/* <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path='*' element={<Dashboard />} /> */}
          </Routes>
        </Suspense>
      </AuthProvider>
    </HashRouter>
  )
}

export default App
