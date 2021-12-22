import { Box, Link } from '@chakra-ui/react';
import {
  CONTACT_URL,
  DEVELOP_LOAD_MAP_URL,
  HOW_TO_USE_URL,
  PRIVACY_POLICY_URL,
  TERMS_OF_SERVICE_URL,
} from '../config/constants';
import { COLOR_CODE_INDIGO_BLUE, COLOR_CODE_WHITE } from '../config/css';

const Footer: React.FC = () => {
  return (
    <footer>
      <Box
        display="flex"
        justifyContent="space-around"
        width="100%"
        padding="40px 20px"
        backgroundColor={COLOR_CODE_WHITE}
        color={COLOR_CODE_INDIGO_BLUE}
        flexDirection={['column', 'row']}
      >
        <Box>ロゴ</Box>
        <Box display="flex" flexDirection="column" marginTop="20px">
          <Box fontWeight="bold">About</Box>
          <Link href={HOW_TO_USE_URL} isExternal marginTop="10px">
            使い方
          </Link>
          <Link href={DEVELOP_LOAD_MAP_URL} isExternal marginTop="10px">
            開発ロードマップ
          </Link>
          <Link href={CONTACT_URL} isExternal marginTop="10px">
            お問い合わせ
          </Link>
        </Box>
        <Box display="flex" flexDirection="column" marginTop="20px">
          <Box fontWeight="bold">Legal</Box>
          <Link href={TERMS_OF_SERVICE_URL} isExternal marginTop="10px">
            利用規約
          </Link>
          <Link href={PRIVACY_POLICY_URL} isExternal marginTop="10px">
            プライバシーポリシー
          </Link>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
