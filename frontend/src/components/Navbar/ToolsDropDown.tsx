import { Button, Text, Menu, MenuButton, MenuItem, MenuList, Flex, Link, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { MdCompareArrows, MdStickyNote2, MdViewInAr } from 'react-icons/md';
import { VscSymbolString } from 'react-icons/vsc';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { SiCheckio, SiMoleculer, SiIpfs } from 'react-icons/si';
import router from 'next/router';
import { IoLogoBuffer } from 'react-icons/io5';

const ToolsDropDown: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Menu isOpen={isOpen}>
      <MenuButton height="45px" display={{ base: 'none', md: 'unset' }} minWidth="50px" onMouseLeave={onClose} onMouseEnter={onOpen} zIndex="1" _hover={{ bgColor: '#212427', color: '#6185EE' }} borderRadius="0px" bg="#212427" color="white" pl={4} pr={3}>
        <Flex align="center">
          <MdViewInAr />
          <Text fontWeight="bold" ml={2}>
            Tools
          </Text>
          {isOpen ? <BiChevronUp /> : <BiChevronDown />}
        </Flex>
      </MenuButton>
      <MenuList onMouseLeave={onClose} onMouseEnter={onOpen} borderRadius="10px" mt={-2} zIndex="2" p={3}>
        <Text mt={-0.5} fontWeight={700}>
          Essential
        </Text>
        <MenuItem
          onClick={() => {
            router.push('/rewordsentence');
          }}
          borderRadius="5px"
        >
          <Link fontWeight={700} textDecoration="none" _hover={{ textDecoration: 'none' }} target="_blank">
            <Flex flexDirection="row" align="center">
              <VscSymbolString /> &nbsp;&nbsp;Reword Sentence
            </Flex>
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push('/textanalyzer');
          }}
          borderRadius="5px"
        >
          <Link fontWeight={700} textDecoration="none" _hover={{ textDecoration: 'none' }} target="_blank">
            <Flex flexDirection="row" align="center">
              <SiMoleculer /> &nbsp;&nbsp;Text Analyzer
            </Flex>
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push('/analogygenerator');
          }}
          borderRadius="5px"
        >
          <Link fontWeight={700} textDecoration="none" _hover={{ textDecoration: 'none' }} target="_blank">
            <Flex flexDirection="row" align="center">
              <SiIpfs /> &nbsp;&nbsp;Analogy Generator
            </Flex>
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push('/guidednotes');
          }}
          borderRadius="5px"
        >
          <Link fontWeight={700} textDecoration="none" _hover={{ textDecoration: 'none' }} target="_blank">
            <Flex flexDirection="row" align="center">
              <MdStickyNote2 /> &nbsp;&nbsp;Guided Notes
            </Flex>
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push('/compare');
          }}
          borderRadius="5px"
        >
          <Link fontWeight={700} textDecoration="none" _hover={{ textDecoration: 'none' }} target="_blank">
            <Flex flexDirection="row" align="center">
              <MdCompareArrows /> &nbsp;&nbsp;Compare Country
            </Flex>
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push('/qageneration');
          }}
          borderRadius="5px"
        >
          <Link fontWeight={700} textDecoration="none" _hover={{ textDecoration: 'none' }} target="_blank">
            <Flex flexDirection="row" align="center">
              <IoLogoBuffer /> &nbsp;&nbsp;QA Generation
            </Flex>
          </Link>
        </MenuItem>
        {/*
        <Text mt={2} fontWeight={700}>Computer Science</Text>
        <MenuItem onClick={()=>{}} borderRadius="5px"><Link fontWeight={700} textDecoration="none" _hover={{textDecoration: 'none'}} target="_blank"><Flex flexDirection="row" align="center"><SiCheckio /> &nbsp;&nbsp;Complexity Analysis</Flex></Link></MenuItem>
        */}
        <Text color="#6185EE" ml={3} fontWeight={700}>
          More Coming Soon...
        </Text>
      </MenuList>
    </Menu>
  );
};
export default ToolsDropDown;
