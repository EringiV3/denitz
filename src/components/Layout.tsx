import { Box, Container } from '@chakra-ui/react';
import Header from '../components/Header';

const Layout: React.FC = ({ children }) => {
  return (
    <Box minHeight="100vh">
      <Header />
      <Container maxW="container.md">{children}</Container>
    </Box>
  );
};

export default Layout;
