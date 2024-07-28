import Loading from '@/components/loading'
import ROUTES from '@/constants/routes'
import { useUserStore } from '@/hooks/use-user-store'
import React from 'react'
import { Navigate } from 'react-router-dom'

const LoginProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useUserStore()

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to={ROUTES.DASHBOARD} />
  }

  return children
}

export default LoginProtectedRoute