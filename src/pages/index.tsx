import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@chakra-ui/react';
import NextImage from 'next/image';
import React from 'react';
import Button from '../components/Button';
import Layout from '../components/Layout';
import { COLOR_CODE_INDIGO_BLUE } from '../config/css';

const IndexPage = () => {
  const { loginWithRedirect } = useAuth0();

  const handleClickButton = () => {
    loginWithRedirect();
  };

  return (
    <Layout>
      <Box color={COLOR_CODE_INDIGO_BLUE} marginTop="40px">
        <Box>
          <Box textAlign="center" fontSize="4xl" fontWeight="bold">
            ジーンズの色落ちを記録・共有できる
          </Box>
          <Box textAlign="center" fontSize="6xl" fontWeight="bold">
            Denitz
          </Box>
          <Box display="flex" justifyContent="center" marginTop="40px">
            <Button onClick={handleClickButton} width="50%">
              新規登録
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" marginTop="40px">
            <NextImage
              src="/assets/lp_top.jpg"
              width="500"
              height="800"
              objectFit="contain"
            />
          </Box>
        </Box>
        <Box>
          <Box
            textAlign="center"
            fontSize="xl"
            fontWeight="bold"
            marginTop="40px"
          >
            使い方
          </Box>
          <Box>
            <Box size="lg" marginTop="20px">
              1. 自分の持っているデニムを追加します
            </Box>
          </Box>
          <Box>
            <Box size="lg" marginTop="20px">
              2. デニムの色落ちを定期的に記録して投稿！
            </Box>
          </Box>
        </Box>
        <Box>
          <Box
            textAlign="center"
            fontSize="xl"
            fontWeight="bold"
            marginTop="40px"
          >
            最新色落ち記録投稿
          </Box>
          <Box>色落ち記録新着５件</Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default IndexPage;
