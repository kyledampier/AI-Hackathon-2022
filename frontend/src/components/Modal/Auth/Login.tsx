import { Button, Divider, Input, Text, Image, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { auth } from '../../../firebase/clientApp';
import { useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import { FIREBASE_ERRORS } from '../../../firebase/error';
const Login:React.FC = () => {

    const setAuthModalState = useSetRecoilState(authModalState)

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth)

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("fORM SUBMIT")
        event.preventDefault();

        signInWithEmailAndPassword(loginForm.email, loginForm.password)
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    return (
        <form onSubmit={onSubmit}>
            <Flex width="105%" flexDirection="column">
                <Flex align="center" flexDirection="row" justifyContent="center"> 
                    <Image src="/images/educatus_mid.png" height="54px" width="54px" />
                    <Text ml={1} mr={5} fontWeight={900} fontSize="20pt" color="white">educatus</Text>
                </Flex>
                <Text align="center" fontWeight={600} color="white" mb={2}>Sign in to leverage ai tools today!</Text>
                <Text fontWeight={900} color="white">Email</Text>
                <Input _placeholder={{color: '#2B2C31'}} _focus={{border: '2px solid #616aee'}} fontWeight={700} color="white" border="0px" bg="#202125" required name="email" placeholder="Email Address" type="email" mb={2} onChange={onChange} />
                <Text fontWeight={900} color="white">Password</Text>
                <Input _placeholder={{color: '#2B2C31'}} _focus={{border: '2px solid #616aee'}} fontWeight={700} color="white" border="0px" bg="#202125" mb={2} required name="password" placeholder="Password" type="password" onChange={onChange} />
                <Text textAlign='center' color='red' fontSize='10pt'>{FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}</Text>
                <Button _focus={{border: '2px solid #616aee'}}  isLoading={loading} width='100%' height='36px' mt={2} mb={2} bg="#616aee" color="white" type='submit' _hover={{bg: '#5f40f7'}}>Sign In</Button>
                <Flex justify="center">
                    <Text color="white" fontWeight={600} textAlign="center" fontSize="9pt" mt={1}>Forgot your password?&nbsp;</Text>
                    <Text textAlign="center" fontSize="9pt" mt={1} color="#616aee" fontWeight={700} _hover={{cursor: 'pointer'}} onClick={() => setAuthModalState((prev) => ({
                        ...prev,
                        view: 'resetPassword',
                    }))}>Reset</Text>
                </Flex>
                <Flex justify="center">
                    <Text color="white" fontWeight={600} textAlign="center" fontSize="9pt" mt={2} mb={3}>New here?&nbsp;</Text>
                    <Text textAlign="center" mt={2} mb={2} fontSize="9pt" fontWeight={700} color="#616aee" _hover={{cursor: 'pointer'}} onClick={() => setAuthModalState((prev) => ({
                        ...prev,
                        view: 'signup',
                    }))}> Sign Up</Text>
                </Flex>
                
            </Flex>
            
        </form>
    )
}
export default Login;