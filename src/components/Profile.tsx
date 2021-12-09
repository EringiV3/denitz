import { Avatar, Box, Button, Heading, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FaInstagram, FaLink, FaTwitter } from 'react-icons/fa';
import { INSTAGRAM_URL, TWITTER_URL } from '../config/constants';
import { Profile } from '../lib/graphql';

type Props = {
  accountId: string;
  profile: Profile;
};
const Profile: React.FC<Props> = ({ accountId, profile }) => {
  const router = useRouter();

  const handleClickEdit = () => {
    router.push('/settings/profile');
  };

  return (
    <>
      <Box marginTop="40px" display="flex" justifyContent="space-between">
        <Avatar src={profile.iconImageUrl ?? undefined} size="xl" />
        <Button onClick={handleClickEdit}>編集する</Button>
      </Box>
      <Box marginTop="10px">
        <Heading size="lg">{profile.name}</Heading>
        <Box color="gray.600">@{accountId}</Box>
      </Box>
      <Box marginTop="10px">{profile.description}</Box>
      <Box display="flex" width="30%" marginTop="20px">
        {profile.twitterUserName && profile.twitterUserName !== '' && (
          <Link isExternal href={`${TWITTER_URL}/${profile.twitterUserName}`}>
            <FaTwitter size="25px" />
          </Link>
        )}
        {profile.instagramUserName && profile.instagramUserName !== '' && (
          <Link
            isExternal
            href={`${INSTAGRAM_URL}/${profile.instagramUserName}`}
            marginLeft="20px"
          >
            <FaInstagram size="25px" />
          </Link>
        )}
        {profile.websiteUrl && profile.websiteUrl !== '' && (
          <Link isExternal href={profile.websiteUrl} marginLeft="20px">
            <FaLink size="25px" />
          </Link>
        )}
      </Box>
    </>
  );
};

export default Profile;
