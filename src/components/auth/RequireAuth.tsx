import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { UserInformationContext } from '../../contexts/userContext';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const userInformation = useContext(UserInformationContext);
  const location = useLocation();

  if (userInformation.userData?.id) {
    return children;
  }
  return (
    <Navigate
      to="/"
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuth;
