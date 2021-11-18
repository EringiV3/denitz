import {
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import NextImage from 'next/image';
import React from 'react';
import { FaAngleDown, FaEdit, FaTrashAlt } from 'react-icons/fa';
import Layout from '../../../components/Layout';
import { GetDenimQuery } from '../../../lib/graphql';
import { createGraphqlClient } from '../../../lib/graphqlClient';

const DenimDetailPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  return (
    <Layout>
      <Box marginTop="40px" display="flex" justifyContent="flex-end">
        <Menu>
          <MenuButton as={Button} rightIcon={<FaAngleDown />}>
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FaEdit size="15px" />}>編集</MenuItem>
            <MenuItem icon={<FaTrashAlt size="15px" />}>
              <Box color="red">削除</Box>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box>
        <Heading size="lg">{data.getDenim?.name}</Heading>
        <Box display="flex" justifyContent="center" marginTop="40px">
          <NextImage
            src={data.getDenim?.imageUrl ?? ''}
            width="500"
            height="500"
            objectFit="contain"
          />
        </Box>
        <Box marginTop="40px">{data.getDenim?.description}</Box>
        <Heading size="md" marginTop="40px">
          色落ち記録
        </Heading>
      </Box>
    </Layout>
  );
};

type ServerSideProps = {
  data: GetDenimQuery;
};
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
) => {
  const client = createGraphqlClient();
  const data = await client.GetDenim({
    id: context.query.denimId as string,
  });
  if (data === null) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
};

export default DenimDetailPage;
