import { Box, Container } from '@chakra-ui/react';
import Header from '../components/Header';

const Layout: React.FC = ({ children }) => {
  return (
    <Box>
      <Header />
      <Container>{children}</Container>
    </Box>
  );
};

export default Layout;
