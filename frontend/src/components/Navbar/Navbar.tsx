import React from 'react';
import { Flex, Text, Button, Image } from '@chakra-ui/react';
import { AiOutlinePartition } from 'react-icons/ai';
import { MdOutlineDashboard, MdOutlineWavingHand, MdViewInAr } from 'react-icons/md';
import ToolsDropDown from './ToolsDropDown';
import Router from 'next/router';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../atoms/authModalAtom';
import AuthModal from '../Modal/Auth/AuthModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';
import { signOut } from 'firebase/auth';
import router from 'next/router';

const Navbar: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex bg="#212427" justifyContent="center">
      <Flex bg="#212427" height="96px" padding="6px 12px" align="center" width="100%" maxWidth="1250px" minWidth="360px">
        <Image ml={6} src="/images/educatus.png" height="46px" minWidth="46px" mr={3} />
        <Text
          style={{ userSelect: 'none' }}
          _hover={{ cursor: 'pointer' }}
          onClick={() => {
            router.push('/');
          }}
          color="white"
          fontSize="24pt"
          fontWeight={800}
        >
          educatus
        </Text>
        <Button
          _active={{ bgColor: '#212427' }}
          onClick={() => {
            Router.push('/');
          }}
          _focus={{ outline: 'none' }}
          _hover={{ bgColor: '#212427', color: '#6185EE' }}
          ml="auto"
          color="white"
          bgColor="#212427"
          fontWeight={700}
        >
          <MdOutlineDashboard />
          &nbsp;&nbsp;Dashboard
        </Button>
        <AuthModal />
        <ToolsDropDown />
        <Button
          _active={{ bgColor: '#212427' }}
          onClick={() => {
            Router.push('/methodology');
          }}
          _focus={{ outline: 'none' }}
          _hover={{ bgColor: '#212427', color: '#6185EE' }}
          color="white"
          bgColor="#212427"
          fontWeight={700}
        >
          <AiOutlinePartition />
          &nbsp;&nbsp;Methodology
        </Button>
        {user ? (
          <Button onClick={() => signOut(auth)} mr={6} height="42px" pl={5} pr={5} ml={10} bgColor="#6185EE" color="white" _hover={{ bgColor: '#616aee' }} fontWeight={800}>
            Logout
          </Button>
        ) : (
          <Button onClick={() => setAuthModalState({ open: true, view: 'login' })} mr={6} height="42px" pl={5} pr={5} ml={10} bgColor="#6185EE" color="white" _hover={{ bgColor: '#616aee' }} fontWeight={800}>
            Sign In
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
export default Navbar;
