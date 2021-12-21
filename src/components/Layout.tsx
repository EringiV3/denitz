import { Box, Container } from '@chakra-ui/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { COLOR_CODE_SKY_BLUE } from '../config/css';

const Layout: React.FC = ({ children }) => {
  return (
    <Box backgroundColor={COLOR_CODE_SKY_BLUE}>
      <Header />
      <Container minHeight="80vh" maxW="container.md" marginBottom="80px">
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
