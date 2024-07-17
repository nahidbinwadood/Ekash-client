import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <h2 className="font-bold text-4xl">Loading....</h2>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
