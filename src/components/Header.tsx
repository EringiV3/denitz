import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Box, Heading, useDisclosure } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useGraphqlClient } from '../hooks/useGraphqlClient';
import DrawerMenu from './Drawer';
import LoginButton from './LoginButton';

const Header: React.FC = () => {
  const { client, hasToken } = useGraphqlClient();
  const { data } = useQuery(['currentUser'], () => client.GetCurrentUser(), {
    enabled: hasToken,
  });
  const { isAuthenticated } = useAuth0();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <header>
        <Box
          backgroundColor="blue.700"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="white" size="lg" padding="10px">
            Denitz
          </Heading>
          <Box>
            {isAuthenticated ? (
              <Avatar
                src={data?.getCurrentUser?.profile?.iconImageUrl ?? undefined}
                size="sm"
                margin="10px"
                cursor="pointer"
                onClick={onOpen}
              />
            ) : (
              <LoginButton />
            )}
          </Box>
        </Box>
      </header>
      <DrawerMenu
        isOpen={isOpen}
        onClose={onClose}
        currentUserInfo={{
          accountId: data?.getCurrentUser?.accountId ?? '',
          iconImageUrl: data?.getCurrentUser?.profile?.iconImageUrl ?? '',
          name: data?.getCurrentUser?.profile?.name ?? '',
        }}
      />
    </>
  );
};

export default Header;
