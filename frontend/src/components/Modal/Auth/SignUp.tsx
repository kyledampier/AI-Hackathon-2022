import { Button, Divider, Input, Text, Image, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={() => {}}>
      <Flex width="105%" flexDirection="column">
        <Flex align="center" flexDirection="row" justifyContent="center">
          <Image src="/images/educatus_mid.png" height="54px" width="54px" />
          <Text ml={1} mr={5} fontWeight={900} fontSize="20pt" color="white">
            educatus
          </Text>
        </Flex>
        <Text align="center" mt={5} fontWeight={600} color="white" mb={2}>
          Sign up to leverage ai tools today!
        </Text>
        <Text fontWeight={900} color="white">
          Email
        </Text>
        <Input
          _placeholder={{ color: "#2B2C31" }}
          _focus={{ border: "2px solid #616aee" }}
          fontWeight={700}
          color="white"
          border="0px"
          bg="#202125"
          required
          name="email"
          placeholder="Email Address"
          type="email"
          mb={2}
          onChange={onChange}
        />
        <Text fontWeight={900} color="white">
          Password
        </Text>
        <Input
          _placeholder={{ color: "#2B2C31" }}
          _focus={{ border: "2px solid #616aee" }}
          fontWeight={700}
          color="white"
          border="0px"
          bg="#202125"
          mb={2}
          required
          name="password"
          placeholder="Password"
          type="password"
          onChange={onChange}
        />
        {/* <Text textAlign='center' color='red' fontSize='10pt'>TODO Firebase error goes here</Text> */}
        <Button
          _focus={{ border: "2px solid #616aee" }}
          _loading={{ backgroundColor: "teal.400" }}
          isLoading={false}
          width="100%"
          height="36px"
          mt={2}
          mb={2}
          bg="#616aee"
          color="white"
          type="submit"
          _hover={{ bg: "#5f40f7" }}
        >
          Sign Up
        </Button>

        <Flex justify="center">
          <Text
            color="white"
            fontWeight={600}
            textAlign="center"
            fontSize="9pt"
            mt={1}
          >
            Have an account?&nbsp;
          </Text>
          <Text
            textAlign="center"
            mt={1}
            fontSize="9pt"
            fontWeight={700}
            color="#616aee"
            _hover={{ cursor: "pointer" }}
            onClick={() =>
              setAuthModalState((prev) => ({
                ...prev,
                view: "login",
              }))
            }
          >
            {" "}
            Login
          </Text>
        </Flex>
      </Flex>
    </form>
  );
};
export default SignUp;
