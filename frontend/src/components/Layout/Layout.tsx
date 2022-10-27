import React from 'react';
import { Flex } from '@chakra-ui/react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Head from 'next/head'
type Props = {
    children?: React.ReactNode
};

const Layout:React.FC<Props> = ({ children }) => {
    
    return (
        <>  
            <Head>
                <title>educatus</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
                <meta name="theme-color" content="#ffffff" />
                
            </Head>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}
export default Layout;