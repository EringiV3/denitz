import { Box, Heading, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FaInstagram, FaLink, FaTwitter } from 'react-icons/fa';
import Button from '../components/Button';
import { INSTAGRAM_URL, TWITTER_URL } from '../config/constants';
import { COLOR_CODE_GRAY, COLOR_CODE_INDIGO_BLUE } from '../config/css';
import { Profile } from '../lib/graphql';
import Avatar from './Avatar';

type Props = {
  accountId: string;
  profile: Profile;
  isEditable: boolean;
};
const Profile: React.FC<Props> = ({ accountId, profile, isEditable }) => {
  const router = useRouter();

  const handleClickEdit = () => {
    router.push('/settings/profile');
  };

  return (
    <>
      <Box marginTop="40px" display="flex" justifyContent="space-between">
        <Avatar src={profile.iconImageUrl ?? undefined} size={100} />
        {isEditable && <Button onClick={handleClickEdit}>編集する</Button>}
      </Box>
      <Box marginTop="10px">
        <Heading size="lg" color={COLOR_CODE_INDIGO_BLUE}>
          {profile.name}
        </Heading>
        <Box color={COLOR_CODE_GRAY}>@{accountId}</Box>
      </Box>
      <Box marginTop="10px" color={COLOR_CODE_GRAY}>
        {profile.description}
      </Box>
      <Box display="flex" width="30%" marginTop="20px">
        {profile.twitterUserName && profile.twitterUserName !== '' && (
          <Link isExternal href={`${TWITTER_URL}/${profile.twitterUserName}`}>
            <FaTwitter size="25px" color={COLOR_CODE_INDIGO_BLUE} />
          </Link>
        )}
        {profile.instagramUserName && profile.instagramUserName !== '' && (
          <Link
            isExternal
            href={`${INSTAGRAM_URL}/${profile.instagramUserName}`}
            marginLeft="20px"
          >
            <FaInstagram size="25px" color={COLOR_CODE_INDIGO_BLUE} />
          </Link>
        )}
        {profile.websiteUrl && profile.websiteUrl !== '' && (
          <Link isExternal href={profile.websiteUrl} marginLeft="20px">
            <FaLink size="25px" color={COLOR_CODE_INDIGO_BLUE} />
          </Link>
        )}
      </Box>
    </>
  );
};

export default Profile;
