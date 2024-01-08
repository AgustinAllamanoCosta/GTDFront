import { useContext } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { useLocation, Navigate } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const userInformation = useContext(UserInformationContext);
  const location = useLocation();

  return (
    <>
      {userInformation.userData?.id ? (
        children
      ) : (
        <Navigate
          to="/"
          state={{ from: location }}
          replace
        />
      )}
    </>
  );
};

export default RequireAuth;
