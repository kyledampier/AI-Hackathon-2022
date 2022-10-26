import React from 'react';
import { Flex } from '@chakra-ui/react'
import Navbar from '../Navbar/Navbar';

type Props = {
    children?: React.ReactNode
};

const Layout:React.FC<Props> = ({ children }) => {
    
    return (
        <>  
            <Navbar />
            <main>{children}</main>
        </>
    )
}
export default Layout;