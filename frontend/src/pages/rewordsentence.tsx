import { Box, Button, Flex, RadioGroup, Radio, Stack, Text, Textarea } from '@chakra-ui/react';
import type { NextPage } from 'next';
import router from 'next/router';
import { useState } from 'react';
import { VscSymbolString } from 'react-icons/vsc';

const HOST_PREFIX = process.env.HOST_PREFIX ?? 'http://localhost:8080';

const RewordSentence: NextPage = () => {
  const [rewordForm, setRewordForm] = useState({
    text: '',
    reworded: '',
  });

  const [audience, setAudience] = useState('1');
  const [loading, setLoading] = useState(false);
  const [reword, setReword] = useState('');

  const getReword = async () => {
    const request = await fetch(`${HOST_PREFIX}/rewording`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        audience: Number(audience),
        text: rewordForm.text,
      }),
    });
    const data = await request.json();
    return data;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    getReword()
      .then((response) => {
        console.log(response.reworded_text);
        setReword(response.reworded_text);
      })
      .then(() => setLoading(false));
  };

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRewordForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Flex justifyContent="center">
      <Flex width="100%" maxWidth="1200px" bgColor="#212427" flexDirection="column">
        <Flex mb={0} ml={1} mr={1} border="2px solid #38393E" flexDirection="column" pt={8} pl={10} pr={10} bg="#202125" height="780px" borderRadius="15px">
          <Flex p={0} borderRadius="12px" border="2px solid #38393E" flexDirection="column" height="700px" bg="#2B2C31">
            <Flex p={2.5} borderTopRadius="10px" height="40px" bg="#202125">
              <Text color="white" fontWeight={800} align="center">
                <VscSymbolString />
              </Text>
              <Text ml={1.5} mt={-1} fontWeight={800} color="white">
                Reword Sentence
              </Text>
              <Box onClick={() => router.push('/')} _hover={{ cursor: 'pointer' }} mt={-1} borderRadius="10px" ml="auto" border="2px solid #38393E" height="25px" width="180px">
                <Text ml={2.5} mt={-0.5} fontWeight={800} color="white" mr={0}>
                  ← Back to Dashboard
                </Text>
              </Box>
            </Flex>
            <Flex flexDir="column" p={5} pl={6} pr={3} flexDirection="row" width="100%">
              <Text ml={6} fontWeight={800} color="white">
                Understanding technical text can be hard. We hope to simplify that using machine learning. Add some text, select the skill level that you want your text to be simplified (or enhanced!) and watch as your text is reconstructed using simpler vocabulary for non-technical audiences.
              </Text>
            </Flex>
            <form onSubmit={onSubmit}>
              <Flex mb={7} flexDirection="row" ml={10} mr={10}>
                <Flex flexDirection="column" border="2px solid #38393E" pt={5} pl={5} pr={5} pb={5} borderRadius="10px" mr={5} height="400px" width="50%" bg="#202125">
                  <Text fontSize="14pt" color="white" fontWeight={800}>
                    Text
                  </Text>
                  <Textarea onChange={onChange} height="100%" name="text" _placeholder={{ color: '#55586b' }} color="white" bg="#202125" required _focus={{ border: '1.5px solid #616aee' }} isDisabled={false} placeholder="Text you want to simplify" />
                </Flex>
                <Flex flexDirection="column" pt={5} pl={5} pr={5} border="2px solid #38393E" borderRadius="10px" ml={5} height="400px" width="50%" bg="#202125">
                  <Text mb={4} fontWeight={800} fontSize="14pt" color="white">
                    Simplified Text
                  </Text>
                  <Text fontSize="14pt" fontWeight={700} color="#616aee">
                    {reword}
                  </Text>
                </Flex>
              </Flex>
              <RadioGroup value={audience} ml="43px" mb={5} color={'white'} onChange={setAudience}>
                <Stack direction={'row'} spacing={4}>
                  <Radio fontWeight={700} colorScheme="whiteAlpha" value={'1'}>
                    Beginner
                  </Radio>
                  <Radio fontWeight={700} colorScheme="whiteAlpha" value={'2'}>
                    Intermediate
                  </Radio>
                  <Radio fontWeight={700} colorScheme="whiteAlpha" value={'3'}>
                    Advanced
                  </Radio>
                </Stack>
              </RadioGroup>
              <Button isLoading={loading} type="submit" _hover={{ bg: '#5f40f7' }} height="45px" bg="#616aee" color="white" ml="43px" width="155px">
                Simplify Text
              </Button>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RewordSentence;
