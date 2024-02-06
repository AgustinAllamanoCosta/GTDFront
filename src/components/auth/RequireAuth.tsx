import { useContext } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { useLocation, Navigate } from 'react-router-dom';
import { INDEX } from '../../constants/routePaths';

const RequireAuth = ({ children }: { children: React.JSX.Element }) => {
  const userInformation = useContext(UserInformationContext);
  const location = useLocation();

  return (
    <>
      {userInformation.userData?.id ? (
        children
      ) : (
        <Navigate
          to={INDEX}
          state={{ from: location }}
          replace
        />
      )}
    </>
  );
};

export default RequireAuth;
