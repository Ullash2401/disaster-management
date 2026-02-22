import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const guest = sessionStorage.getItem("guest");

  if (!token && !guest) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
