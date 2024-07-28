import Loading from "@/components/loading"
import ROUTES from "@/constants/routes"
import { useUserStore } from "@/hooks/use-user-store"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useUserStore()

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children
  }

  return <Navigate to={ROUTES.LOGIN} />;
}

export default ProtectedRoute