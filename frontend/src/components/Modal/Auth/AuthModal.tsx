import {
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsPersonSquare } from "react-icons/bs";
// import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
// import { auth } from '../../../firebase/clientApp';
import AuthInputs from "./AuthInputs";
// import ResetPassword from './ResetPassword';

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  //   const [user, loading, error] = useAuthState(auth)

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  //   useEffect(() => {
  //     if (user) handleClose()
  //   }, [user])

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent
          width="430px"
          bg="#2B2C31"
          border="2px solid #38393E"
          borderRadius="12px"
          height="418px"
        >
          <Flex p={2.5} borderTopRadius="10px" height="40px" bg="#202125">
            <Text mt={0.5} color="white" fontWeight={800} align="center">
              <BsPersonSquare />
            </Text>
            <Text mt={-0.5} ml={1.5} fontWeight={800} color="white">
              {modalState.view === "login" && <Text>Login</Text>}
              {modalState.view === "signup" && <Text>Sign up</Text>}
            </Text>
          </Flex>
          <ModalCloseButton
            mt={-1}
            color="white"
            _hover={{ color: "#616aee" }}
          />
          <ModalBody
            pt={0}
            pb={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Flex direction="column" align="center" justify="center">
              {/* <OAuthButtons /> */}
              <AuthInputs />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
