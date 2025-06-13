// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom'

export default function PrivateRouter({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children
}
