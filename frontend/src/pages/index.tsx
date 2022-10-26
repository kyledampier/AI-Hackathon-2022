import type { NextPage } from 'next'
import { Flex, Text } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <Flex justifyContent='center'>
      <Flex width="100%" maxWidth="1200px" bgColor="#212427" flexDirection='column'>
        <Text color="white">Test</Text>
      </Flex>
    </Flex>
  )
}

export default Home

