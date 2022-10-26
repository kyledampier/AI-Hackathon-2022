import { Flex, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { MdOutlineDashboard } from 'react-icons/md'
import { AiOutlinePartition } from 'react-icons/ai'

const Methodology: NextPage = () => {
  return (
    <Flex justifyContent='center'>
      <Flex width="100%" maxWidth="1200px" bgColor="#212427" flexDirection='column'>
      <Flex mb={0} ml={1} mr={1} border="2px solid #38393E" flexDirection="column" pt={8} pl={10} pr={10} bg="#202125" height="780px" borderRadius="15px">
            
            <Flex p={0} borderRadius="12px" border="2px solid #38393E" flexDirection="column" height="700px" bg="#2B2C31">
                <Flex p={2.5} borderTopRadius="10px" height="40px" bg="#202125">
                    <Text color="white" fontWeight={800} align="center"><AiOutlinePartition /></Text>
                    <Text ml={1.5} mt={-1} fontWeight={800} color="white">Methodology</Text>
                </Flex>
                <Flex flexDir="column" p={5} pl={6} pr={3} flexDirection="row" width="100%">
                    <Text fontWeight={800} color="white">Educatus is a versatile, flexible dashboard of educator tools. Join us in the new paradigm of academia transfused with ai solutions</Text>
                    
                    
                </Flex>
                
            </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Methodology
