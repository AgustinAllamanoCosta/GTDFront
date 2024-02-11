import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserData } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { UserInformationContext } from '../contexts/userContext';

export const useGoogleLoginActions = (redirectPath: string) => {
  const userInformation = useContext(UserInformationContext);
  const navigate = useNavigate();

  const loginGoogle = useCallback(
    useGoogleLogin({
      onSuccess: async (codeResponse: any) => {
        const googleResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: 'application/json',
            },
          },
        );
        const newUser: UserData = {
          id: googleResponse.data.id,
          name: googleResponse.data.name,
          photoURL: googleResponse.data.picture,
          accessToken: codeResponse.access_token,
        };
        userInformation.setUserData({ ...newUser });
      },
      onError: (error) => {
        console.group('Login Error');
        console.error('Login Failed:', error);
        console.groupEnd();
        userInformation.setUserData(undefined);
      },
    }),
    [userInformation.userData],
  );

  useEffect(() => {
    const userId: string | undefined = userInformation.userData?.id;
    if (userId) navigate(redirectPath);
  }, [userInformation.userData]);

  return {
    loginGoogle,
  };
};
