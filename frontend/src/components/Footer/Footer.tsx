import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';
const Footer:React.FC = () => {
    
    return (
        <Flex align="center" mt={6} mb={6} justifyContent="center" flexDirection="row">
            <Image src="/images/educatus.png" height="34px" width="34px" />
            <Text ml={4} fontWeight={700} color="white" >Produced for and during UF AI Days 2022</Text>
        </Flex>
    )
}
export default Footer;