import React from 'react';
import { Flex } from '@chakra-ui/react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

type Props = {
    children?: React.ReactNode
};

const Layout:React.FC<Props> = ({ children }) => {
    
    return (
        <>  
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}
export default Layout;