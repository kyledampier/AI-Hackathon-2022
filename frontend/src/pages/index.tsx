import type { NextPage } from 'next'
import { Flex, Text } from '@chakra-ui/react'
import Dashboard from '../components/Dashboard/Dashboard'

const Home: NextPage = () => {
  return (
    <Flex justifyContent='center'>
      <Flex width="100%" maxWidth="1200px" bgColor="#212427" flexDirection='column'>
        <Dashboard />
      </Flex>
    </Flex>
  )
}

export default Home

