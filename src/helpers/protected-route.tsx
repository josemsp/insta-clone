import Loading from "@/components/loading"
import ROUTES from "@/constants/routes"
import useAuth from "@/hooks/use-auth"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children
  }

  return <Navigate to={ROUTES.LOGIN} />;
}

export default ProtectedRoute