import React, { useEffect } from 'react';
import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { VscSymbolString } from 'react-icons/vsc';
import { SiMoleculer, SiIpfs, SiCheckio } from 'react-icons/si';
import { MdOutlineDashboard, MdLayersClear } from 'react-icons/md';
import { IoAdd, IoCloseSharp } from 'react-icons/io5';
import { GiGears } from 'react-icons/gi';
import { useRecoilState } from 'recoil';
import { dashboardQueState } from '../../atoms/dashboardQueAtom';
import router from 'next/router';

const Dashboard:React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [dashQue, setDashQue] = useRecoilState(dashboardQueState);
    const toast = useToast()

    const printQue = () => {
        console.log(dashQue.que)
    }

    const clearQue = () => {
        setDashQue((prevState) => ({
            ...prevState,
            que: [],
            empty: true
        }));
    }

    const removeFromQue = (num: number) => {
        if (dashQue.que.includes(num)) {
            var index = dashQue.que.indexOf(num)
            setDashQue((prevState) => ({
                ...prevState,
                que: [...prevState.que.slice(0, index), ...prevState.que.slice(index + 1)]
            }));
        }
    }

    const addToQue = (num: number) => {
        if (dashQue.que.includes(num)) {
            toast({
                position: 'top-right',
                render: () => (
                  <Box borderRadius="12px" color='black' fontWeight={800} p={3} bg='white'>
                    Tool already on your dashboard!
                  </Box>
            )});
            return;
        }

        setDashQue((prevState) => ({
            ...prevState,
            que: [...prevState.que, num]
        }));
    }

    useEffect(() => {

    }, [dashQue.que]) 

    return (
        <Flex ml={1} mr={1} border="2px solid #38393E" flexDirection="column" pt={8} pl={10} pr={10} bg="#202125" height="780px" borderRadius="15px">
            
            <Flex p={0} borderRadius="12px" border="2px solid #38393E" flexDirection="column" height="700px" bg="#2B2C31">
                <Flex p={2.5} borderTopRadius="10px" height="40px" bg="#202125">
                    <Text color="white" fontWeight={800} align="center"><MdOutlineDashboard /></Text>
                    <Text ml={1.5} mt={-1} fontWeight={800} color="white">Dashboard</Text>
                    <Menu>
                        <MenuButton ml="auto">
                            <Box onClick={() => addToQue(1)} _hover={{cursor: 'pointer'}} mt={-1} borderRadius="10px" ml="auto" border="2px solid #38393E" height="25px" width="120px">
                                <Text ml={3} mt={0.5} color="white" fontWeight={800} align="center"><IoAdd /> </Text>
                                <Text  ml={8} mt={-5} fontWeight={800} color="white" mr={2}>Add Tool</Text>

                            </Box>
                        </MenuButton>
                        <MenuList border="2px solid #38393E" bg="#202125" borderRadius="8px">
                                <MenuItem onClick={()=>addToQue(1)} _focus={{}} _hover={{bg: "#202125", color: '#616aee'}} color="white"><VscSymbolString /> &nbsp;&nbsp;Reword Sentence</MenuItem>
                                <MenuItem onClick={()=>addToQue(2)} _focus={{}} _hover={{bg: "#202125", color: '#616aee'}} color="white"><SiMoleculer /> &nbsp;&nbsp;Syntax Checker</MenuItem>
                                <MenuItem onClick={()=>addToQue(3)} _focus={{}} _hover={{bg: "#202125", color: '#616aee'}}color="white"><SiIpfs /> &nbsp;&nbsp;QA Generation</MenuItem>
                                <MenuItem onClick={()=>addToQue(4)} _focus={{}} _hover={{bg: "#202125", color: '#616aee'}}color="white"><SiCheckio /> &nbsp;&nbsp;Complexity Analysis</MenuItem>
                        </MenuList>
                    </Menu>
                    <Box onClick={onOpen} _hover={{cursor: 'pointer'}} borderRadius="10px" ml={3} border="2px solid #38393E" height="25px" width="85px" mt={-1} pl={3}>
                        <Text mt={0.5} color="white" fontWeight={800} align="center"><MdLayersClear/></Text>
                        <Text ml={5} mt={-5} fontWeight={800} color="white" mr={2}>Clear</Text>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent width="320px" bg="#2B2C31" border="2px solid #38393E" borderRadius="12px" height="185px">
                                <Flex p={2.5} borderTopRadius="10px" height="40px" bg="#202125">
                                    <Text mt={0.5} color="white" fontWeight={800} align="center"><GiGears/></Text>
                                    <Text ml={1.5} fontWeight={800} color="white">Action</Text>
                                    
                                </Flex>
                                <Text mt={3} align="center" color="white" fontWeight={600}>Are you sure you want to clear the Dashboard?</Text>
                                <ModalCloseButton _hover={{color: '#616aee'}} mt={-1} color="white" />

                                <ModalFooter mb={2} justifyContent="center" mt="auto">
                                    <Button onClickCapture={()=>clearQue()} _active={{bg: '#5f40f7'}} _hover={{bg: '#5f40f7'}} width="75px" bg="#616aee" color="white" mr={3} onClick={onClose}>
                                    Yes
                                    </Button>
                                    <Button _active={{bg: '#2B2C31', color: '#616aee'}} _hover={{bg: '#2B2C31', color: '#616aee'}} onClick={onClose} width="75px" variant='ghost' color="white">Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>
                    
                </Flex>
                <Flex p={5} pl={6} pr={3} flexDirection="row" width="100%" flexWrap="wrap" >
                    <>
                    
                    {
                        dashQue.que.map((value) => {
                            if (value === 1) {
                                return (
                                    <Flex key={value} _hover={{cursor: 'pointer', border: "3px solid #38393E"}} mb={8} borderRadius="8px" bg="white" width="31%" height="280px" flexDirection="column" mr={2.5} ml={2.5}>
                                        <Flex borderTopRadius="8px" flexDirection="row" height="32px" bg="#C9D4FB" width="100%" p={1}>
                                            <Flex ml={2} flexDirection="row" align="center" fontWeight={800}><VscSymbolString /> &nbsp;&nbsp;Reword Sentence</Flex>
                                            <Text onClick={()=>removeFromQue(value)} ml="auto" mt={1} mr={1} color="black" fontWeight={800} align="center"><IoCloseSharp /></Text>
                                        </Flex>
                                        <Flex onClick={() => router.push('/rewordsentence')}>
                                            <Text fontWeight={500} ml={2} mt={2}>Reconstruct sentences using simpler vocabulary for non-technical audiences.</Text>
                                        </Flex>
                                    </Flex>
                                )
                            } else if (value === 2) {
                                return (
                                    <Flex key={value} mb={8} _hover={{cursor: 'pointer', border: "3px solid #38393E"}} borderRadius="8px"  bg="white" width="31%" height="280px" flexDirection="column" mr={2.5} ml={2.5}>
                                        <Flex borderTopRadius="8px" flexDirection="row" height="32px" bg="#F2C4C3" width="100%" p={1}>
                                            <Flex ml={2} flexDirection="row" align="center" fontWeight={800}><SiMoleculer /> &nbsp;&nbsp;Syntax Checker</Flex>
                                            <Text onClick={()=>removeFromQue(value)} ml="auto" mt={1} mr={1} color="black" fontWeight={800} align="center"><IoCloseSharp /></Text>
                                        </Flex>
                                        <Text fontWeight={800} ml={2} mt={2}>Test</Text>
                                        
                                    </Flex>
                                )
                            } else if (value === 3) {
                                return (
                                    <Flex key={value} mb={8} _hover={{cursor: 'pointer', border: "3px solid #38393E"}} borderRadius="8px" bg="white" width="31%" height="280px" flexDirection="column" mr={2.5} ml={2.5}>
                                        <Flex borderTopRadius="8px" flexDirection="row" height="32px" bg="#FEE79C" width="100%" p={1}>
                                            <Flex ml={2} flexDirection="row" align="center" fontWeight={800}><SiIpfs /> &nbsp;&nbsp;QA Generation</Flex>
                                            <Text onClick={()=>removeFromQue(value)} ml="auto" mt={1} mr={1} color="black" fontWeight={800} align="center"><IoCloseSharp /></Text>
                                        </Flex>
                                        <Text fontWeight={800} ml={2} mt={2}>Test</Text>
                                        
                                    </Flex>
                                )
                            } else if (value === 4) {
                                return (
                                    <Flex key={value} mb={8} _hover={{cursor: 'pointer', border: "3px solid #38393E"}} borderRadius="8px" bg="white" width="31%" height="280px" flexDirection="column" ml={2.5} mr={2.5}>
                                        <Flex borderTopRadius="8px" flexDirection="row" height="32px" bg="#a6edb2" width="100%" p={1}>
                                            <Flex ml={2} flexDirection="row" align="center" fontWeight={800}><SiCheckio /> &nbsp;&nbsp;Complexity Analysis</Flex>
                                            <Text onClick={()=>removeFromQue(value)} ml="auto" mt={1} mr={1} color="black" fontWeight={800} align="center"><IoCloseSharp /></Text>
                                        </Flex>
                                        <Text fontWeight={500} ml={2} mt={2}>Reconstruct sentences using simpler vocabulary for non-technical audiences.</Text>
                                        
                                    </Flex>
                                )
                            }
                        })
                    }
                    {dashQue.que.length === 0 && (
                        <Text fontWeight={800} fontSize="17pt" color="white">Your Dashboard is currently empty</Text>
                    )}
                    </>
                </Flex>
                
            </Flex>
        </Flex>
    )
}
export default Dashboard;