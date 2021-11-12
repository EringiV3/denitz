import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import LogoutButton from './LogoutButton';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  currentUserInfo: {
    accountId: string;
    iconImageUrl: string;
    name: string;
  };
};
const DrawerMenu: React.FC<Props> = ({ isOpen, onClose, currentUserInfo }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <NextLink href={`/${currentUserInfo.accountId}`}>
            <Box display="flex">
              <Avatar src={currentUserInfo.name} size="sm" />
              <Box marginLeft="20px">{currentUserInfo.name}</Box>
            </Box>
          </NextLink>
        </DrawerHeader>
        <DrawerBody>hoge</DrawerBody>
        <DrawerFooter>
          <LogoutButton />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMenu;
