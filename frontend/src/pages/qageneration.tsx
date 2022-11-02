import { Box, Button, Flex, Input, Text, Textarea } from '@chakra-ui/react';
import type { NextPage } from 'next';
import router from 'next/router';
import React, { use, useEffect, useState } from 'react';
import { IoLogoBuffer } from 'react-icons/io5';
import { SiIpfs } from 'react-icons/si';
import { constSelector } from 'recoil';

const HOST_PREFIX = process.env.HOST_PREFIX ?? 'http://localhost:8080';

const QAGeneration: NextPage = () => {
  const [text, setText] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qapairs, setQaPairs] = useState(Array<Array<string>>);

  const [wrongAns, setWrongAns] = useState(Array<Number>);
  const [score, setScore] = useState(-1);

  let ansDict: { [key: string]: string } = {};
  let qaDict: { [key: string]: string } = {};

  const getQaPairs = async () => {
    const request = await fetch(`http://localhost:8080/qag`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        text: text,
      }),
    });
    const data = await request.json();
    return data;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    getQaPairs()
      .then((response) => {
        setQaPairs(response.qapairs);
      })
      .then(() => setLoading(false));
    setVisible(true);
  };

  const onQuizSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    qapairs.map((qapair) => {
      qaDict[qapair[0]] = qapair[1];
    });

    qapairs.map((qapair, idx) => {
      if (!ansDict[qapair[0]] || ansDict[qapair[0]] != qaDict[qapair[0]]) {
        setWrongAns((wrongAns) => wrongAns.concat(idx));
      }
    });

    setScore((qapairs.length - wrongAns.length) / qapairs.length);

    setVisible(false);
  };

  const onQuizReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    qaDict = {};
    setScore(-1);
    setWrongAns([]);
    setVisible(false);
  };

  return (
    <Flex justifyContent="center">
      <Flex width="100%" maxWidth="1200px" bgColor="#212427" height="100%" flexDirection="column">
        <Flex mb={0} ml={1} mr={1} border="2px solid #38393E" flexDirection="column" pt={8} pl={10} pr={10} pb={3} bg="#202125" height="100%" borderRadius="15px">
          <Flex p={0} borderRadius="12px" border="2px solid #38393E" flexDirection="column" height="100%" bg="#2B2C31">
            <Flex p={2.5} borderTopRadius="10px" height="40px" bg="#202125">
              <Text color="white" fontWeight={800} align="center">
                <IoLogoBuffer />
              </Text>
              <Text ml={1.5} mt={-1} fontWeight={800} color="white">
                QA Generation
              </Text>
              <Box onClick={() => router.push('/')} _hover={{ cursor: 'pointer' }} mt={-1} borderRadius="10px" ml="auto" border="2px solid #38393E" height="25px" width="180px">
                <Text ml={2.5} mt={-0.5} fontWeight={800} color="white" mr={0}>
                  ← Back to Dashboard
                </Text>
              </Box>
            </Flex>
            <Text ml={10} color="white">
              Text Article → Entity Extraction → Generate Q/A's for each Entity
            </Text>
            <Flex mb={7} flexDirection="row" ml={10} mr={10} justifyContent={'center'}>
              <Flex flexDirection="column" border="2px solid #38393E" height="100%" pt={2} pl={5} pr={5} pb={5} borderRadius="10px" mr={5} width="50%" bg="#202125">
                <Text fontSize="13pt" color="white" fontWeight={700}>
                  Text
                </Text>
                <form onSubmit={onSubmit}>
                  <Textarea
                    onChange={(event) => {
                      setText(event.target.value);
                    }}
                    height="100%"
                    name="text"
                    _placeholder={{ color: '#55586b' }}
                    color="white"
                    bg="#202125"
                    required
                    _focus={{ border: '1.5px solid #616aee' }}
                    isDisabled={false}
                    placeholder="What you want the analogy to describe"
                  />
                  <Button isLoading={loading} type="submit" _hover={{ bg: '#5f40f7' }} height="45px" bg="#616aee" mt="1em" color="white" width="155px">
                    Generate Quiz
                  </Button>
                </form>
              </Flex>

              <Flex flexDirection="column" pt={5} pl={5} pr={5} border="2px solid #38393E" pb={5} borderRadius="10px" ml={5} width="50%" bg="#202125">
                <Text fontWeight={800} fontSize="14pt" color="white">
                  Quiz Generated
                </Text>
                <form onSubmit={score == -1 ? onQuizSubmit : onQuizReset}>
                  {qapairs.map((qapair, idx) => {
                    return (
                      <div key={`${idx} ${qapair}`} style={{ marginBottom: '1em' }}>
                        <Text fontSize="14pt" fontWeight={700} color="#616aee">
                          {qapair[0]}
                        </Text>
                        <Input
                          fontSize="14pt"
                          fontWeight={700}
                          color="white"
                          onChange={(event) => {
                            ansDict[qapair[0]] = event.target.value;
                          }}
                          type={'text'}
                        />
                        <div>{wrongAns.includes(idx) && <Text color={'red'}>Wrong answer! Answer is {qapair[1]}</Text>}</div>
                      </div>
                    );
                  })}
                  {qapairs.length != 0 ? (
                    score == -1 ? (
                      <Button type="submit" _hover={{ bg: '#5f40f7' }} height="45px" bg="#616aee" mt="1em" color="white" width="155px">
                        Grade Quiz
                      </Button>
                    ) : (
                      <Button type="submit" _hover={{ bg: '#5f40f7' }} height="45px" bg="#616aee" mt="1em" color="white" width="155px">
                        Reset Quiz
                      </Button>
                    )
                  ) : (
                    ''
                  )}
                  <div>{score != -1 && <div>{score}</div>}</div>
                </form>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default QAGeneration;
