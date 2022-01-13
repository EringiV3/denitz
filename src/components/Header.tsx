import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Container,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  FaCog,
  FaPlus,
  FaRegFileImage,
  FaSignOutAlt,
  FaUserCircle,
  FaUserEdit,
} from 'react-icons/fa';
import { useQuery } from 'react-query';
import { COLOR_CODE_INDIGO_BLUE, COLOR_CODE_WHITE } from '../config/css';
import { useGraphqlClient } from '../hooks/useGraphqlClient';
import { queryKeys } from '../utils/queryKeyFactory';
import Avatar from './Avatar';
import LoginButton from './LoginButton';

const Header: React.FC = () => {
  const { client, hasToken } = useGraphqlClient();
  const { data } = useQuery(
    queryKeys.currentUser(),
    () => client.GetCurrentUser(),
    {
      enabled: hasToken,
    }
  );
  const { isAuthenticated, logout, isLoading } = useAuth0();
  const router = useRouter();

  return (
    <>
      <header>
        <Box
          backgroundColor={COLOR_CODE_WHITE}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          minHeight="50px"
        >
          <Container
            maxW="container.lg"
            display="flex"
            justifyContent="space-between"
          >
            <NextLink href={`/`} passHref>
              <Box as="a" display="flex" alignItems="center">
                <NextImage width={30} height={30} src="/assets/logo.svg" />
                <Heading
                  color="black"
                  size="lg"
                  display="flex"
                  alignItems="center"
                  paddingLeft="3px"
                >
                  denitz
                </Heading>
              </Box>
            </NextLink>
            <Box>
              {isLoading ? null : isAuthenticated ? (
                <Menu>
                  <MenuButton>
                    <Box margin="10px">
                      <Avatar
                        src={
                          data?.getCurrentUser?.profile?.iconImageUrl ??
                          undefined
                        }
                        size={30}
                      />
                    </Box>
                  </MenuButton>
                  <MenuList color={COLOR_CODE_INDIGO_BLUE}>
                    <MenuItem
                      icon={<FaUserCircle size="15px" />}
                      onClick={() =>
                        router.push(`/${data?.getCurrentUser?.accountId}`)
                      }
                    >
                      プロフィール
                    </MenuItem>
                    <MenuGroup title="AddNew">
                      <MenuItem
                        icon={<FaPlus size="15px" />}
                        onClick={() => router.push('/addNew/denim')}
                      >
                        デニム追加
                      </MenuItem>
                      <MenuItem
                        icon={<FaRegFileImage size="15px" />}
                        onClick={() => router.push('/addNew/denimReport')}
                      >
                        色落ち記録作成
                      </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="設定">
                      <MenuItem
                        icon={<FaUserEdit size="15px" />}
                        onClick={() => router.push('/settings/profile')}
                      >
                        プロフィール設定
                      </MenuItem>
                      <MenuItem
                        icon={<FaCog size="15px" />}
                        onClick={() => router.push('/settings/account')}
                      >
                        アカウント設定
                      </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuItem
                      icon={<FaSignOutAlt size="15px" />}
                      onClick={() =>
                        logout({ returnTo: window.location.origin })
                      }
                    >
                      ログアウト
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <LoginButton />
              )}
            </Box>
          </Container>
        </Box>
      </header>
    </>
  );
};

export default Header;
