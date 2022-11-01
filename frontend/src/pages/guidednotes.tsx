import { Box, Button, Flex, Input, Text, Textarea } from '@chakra-ui/react'
import type { NextPage } from 'next'
import router from 'next/router';
import { useState } from 'react';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { SiIpfs } from 'react-icons/si'
import { constSelector } from 'recoil';

const GuidedNotes: NextPage = () => {
    const [analogyForm, setAnalogyForm] = useState({
        target: "",
        article: "",
      });
    
    const [loading, setLoading] = useState(false)
    const [analogy, setAnalogy] = useState('')
    
    
    const getAnalogy = async (target: string, article: string) => {
        const request = await fetch(`http://localhost:8080/analogy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                'text': analogyForm.article,
                'target': analogyForm.target
            })
        })
        const data = await request.json()
        return data
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        event.preventDefault();

        console.log(analogyForm.target);
        console.log(analogyForm.article)

        getAnalogy(analogyForm.article, analogyForm.target).then(response => {
            console.log(response.analogy)
            setAnalogy(response.analogy)
        }).then(() => setLoading(false))
        
    };

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnalogyForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

  return (
    <Flex justifyContent='center'>
      <Flex width="100%" maxWidth="1200px" bgColor="#212427" flexDirection='column'>
      <Flex mb={0} ml={1} mr={1} border="2px solid #38393E" flexDirection="column" pt={8} pl={10} pr={10} bg="#202125" height="780px" borderRadius="15px">
            
            <Flex p={0} borderRadius="12px" border="2px solid #38393E" flexDirection="column" height="700px" bg="#2B2C31">
                <Flex p={2.5} borderTopRadius="10px" height="40px" bg="#202125">
                    <Text color="white" fontWeight={800} align="center"><MdOutlineStickyNote2 /></Text>
                    <Text ml={1.5} mt={-1} fontWeight={800} color="white">Guided Notes</Text>
                    <Box onClick={() => router.push('/')} _hover={{cursor: 'pointer'}} mt={-1} borderRadius="10px" ml="auto" border="2px solid #38393E" height="25px" width="180px">
                                <Text  ml={2.5} mt={-0.5} fontWeight={800} color="white" mr={0}>← Back to Dashboard</Text>
                    </Box>
                </Flex>
                <Flex ml={2} mr={1} mt={6} mb={6} flexDir="column" pr={3} flexDirection="row" width="100%">
                    <Text ml={10} mr={10} fontWeight={800} color="white" fontSize="13pt">Given a body of text, Guided Notes will generate a PDF document from the text that populates with various fill-in-the-blanks for important entities detected within the text, helping the user study various topics.</Text>
                </Flex>
                <form onSubmit={onSubmit}>
                    <Flex mb={7} flexDirection="row" ml={10} mr={10}>
                        <Flex flexDirection="column" border="2px solid #38393E" pt={2} pl={5} pr={5} borderRadius="10px" mr={5} height="400px" width="50%" bg="#202125">
                            <Text fontSize="13pt" color="white" fontWeight={700}>Text</Text>
                            <Textarea height="350px" onChange={onChange} mb={5} name="article"  _placeholder={{ color: "#55586b" }} color="white" bg="#202125" required _focus={{ border: "1.5px solid #616aee" }} isDisabled={false} placeholder='What you want to populate with fill-in-the-blanks' />
                        </Flex>
                        <Flex  flexDirection="column" pt={5} pl={5} pr={5} border="2px solid #38393E" borderRadius="10px" ml={5} height="400px" width="50%" bg="#202125">
                            <Text mb={4} fontWeight={800} fontSize="14pt" color="white">File Generated</Text>
                            <Text fontSize="14pt" fontWeight={700} color="#616aee">{analogy}</Text>
                        </Flex>
                    </Flex>
                    <Button isLoading={loading} type="submit" _hover={{ bg: "#5f40f7" }} height="45px" bg="#616aee" color="white" ml="43px" width="175px">Create Guided Notes</Button>
                </form>
            </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default GuidedNotes;
