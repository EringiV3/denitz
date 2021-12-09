import { Box, Link } from '@chakra-ui/react';
import {
  CONTACT_URL,
  DEVELOP_LOAD_MAP_URL,
  HOW_TO_USE_URL,
  PRIVACY_POLICY_URL,
  TERMS_OF_SERVICE_URL,
} from '../config/constants';

const Footer: React.FC = () => {
  return (
    <footer>
      <Box
        display="flex"
        justifyContent="space-around"
        width="100%"
        padding="40px 20px"
        backgroundColor="blue.700"
        color="white"
        flexDirection={['column', 'row']}
      >
        <Box>ロゴ</Box>
        <Box display="flex" flexDirection="column">
          <Link
            href={HOW_TO_USE_URL}
            target="_blank"
            rel="noopener"
            marginTop="10px"
          >
            使い方
          </Link>
          <Link
            href={DEVELOP_LOAD_MAP_URL}
            target="_blank"
            rel="noopener"
            marginTop="10px"
          >
            開発ロードマップ
          </Link>
          <Link
            href={CONTACT_URL}
            target="_blank"
            rel="noopener"
            marginTop="10px"
          >
            お問い合わせ
          </Link>
        </Box>
        <Box display="flex" flexDirection="column">
          <Link
            href={TERMS_OF_SERVICE_URL}
            target="_blank"
            rel="noopener"
            marginTop="10px"
          >
            利用規約
          </Link>
          <Link
            href={PRIVACY_POLICY_URL}
            target="_blank"
            rel="noopener"
            marginTop="10px"
          >
            プライバシーポリシー
          </Link>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
