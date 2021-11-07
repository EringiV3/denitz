import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated && user ? (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <LogoutButton />
    </div>
  ) : (
    <div>
      <LoginButton />
    </div>
  );
};

export default Profile;
