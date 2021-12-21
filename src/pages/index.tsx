import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Layout from '../components/Layout';
import LoginButton from '../components/LoginButton';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Layout>
      {isAuthenticated && user ? (
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        <div>
          <LoginButton />
        </div>
      )}
    </Layout>
  );
};

export default Profile;
