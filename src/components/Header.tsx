import { Avatar, Box, Heading } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useGraphqlClient } from '../hooks/useGraphqlClient';

const Header: React.FC = () => {
  const { client, hasToken } = useGraphqlClient();
  const { data } = useQuery(['currentUser'], () => client.GetCurrentUser(), {
    enabled: hasToken,
  });

  return (
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
          <Avatar
            src={data?.getCurrentUser?.profile?.iconImageUrl ?? undefined}
            size="sm"
            margin="10px"
            cursor="pointer"
          />
        </Box>
      </Box>
    </header>
  );
};

export default Header;
