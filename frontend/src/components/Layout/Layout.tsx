import React from 'react';
import { Flex } from '@chakra-ui/react'
type Props = {
    children?: React.ReactNode
};

const Layout:React.FC<Props> = ({ children }) => {
    
    return (
        <>  
            
            <main>{children}</main>
            
        </>
    )
}
export default Layout;