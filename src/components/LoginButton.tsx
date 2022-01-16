import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Button from '../components/Button';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>ログイン</Button>;
};

export default LoginButton;
