import { Box, Container } from '@chakra-ui/react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Layout: React.FC = ({ children }) => {
  return (
    <Box>
      <Header />
      <Container minHeight="80vh" maxW="container.md" marginBottom="80px">
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
