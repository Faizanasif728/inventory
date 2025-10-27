import { ReactNode } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { getCurrentUser, getCurrentToken, logoutUser } from '../../redux/services/authSlice';
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../../utils/decodeToken';

const ProtectRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(getCurrentUser);
  const token = useAppSelector(getCurrentToken);
  const dispatch = useAppDispatch();

  // Check if user exists and token is valid
  if (!user || !token || !isTokenValid(token)) {
    // If token is expired/invalid, clear the auth state
    if (token && !isTokenValid(token)) {
      dispatch(logoutUser());
    }
    return <Navigate to='/login' replace={true} />;
  }

  return children;
};

export default ProtectRoute;
