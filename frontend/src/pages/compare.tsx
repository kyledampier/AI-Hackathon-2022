import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td, Select, Text } from '@chakra-ui/react';
import { MdCompareArrows } from 'react-icons/md';
import router from 'next/router';

const HOST_PREFIX = process.env.HOST_PREFIX ?? 'http://localhost:8080';

interface Country {
  Country: string;
  Code: string;
  ContinentCode: string;
}

const Compare: NextPage = () => {
  const [countries, setCountries] = useState<Array<Country>>([]);
  const [selectedCountries, setSelectedCountries] = useState<Array<string>>([]);

  const [columnOptions, setColumnOptions] = useState<Array<string>>([]);
  const [selectedColumns, setSelectedColumns] = useState<Array<string>>([]);

  const [tableData, setTableData] = useState<Array<any>>([]);

  useEffect(() => {
    fetch(`${HOST_PREFIX}/countries`).then(async (response) => {
      const columns = await fetch(`${HOST_PREFIX}/columns`);
      const columnOptions = await columns.json();
      const cntrys = await response.json();
      setCountries(cntrys);
      setColumnOptions(columnOptions);
      callBackend(selectedCountries, selectedColumns);
    });
  }, [selectedCountries]);

  const callBackend = async (country_codes: Array<string>, cols: Array<string>) => {
    const request = await fetch(`${HOST_PREFIX}/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        country_codes: country_codes,
        columns: cols,
      }),
    });
    const data = await request.json();
    console.log(data);
    setSelectedColumns(cols);
    setSelectedCountries(country_codes);
    setTableData(data);
  };

  const handleSelectCountry = (e: React.ChangeEvent<HTMLFormElement>) => {
    const val = e.target.value as string;
    if (val in selectedCountries) return;
    let tmp = [...selectedCountries] as Array<string>;
    tmp.push(val);
    callBackend(tmp, selectedColumns);
  };

  const handleSelectColumn = (e: React.ChangeEvent<HTMLFormElement>) => {
    const val = e.target.value as string;
    if (val in selectedColumns) return;
    const tmp = [...selectedColumns] as Array<string>;
    tmp.push(val);
    callBackend(selectedCountries, tmp).then(() => {
      console.log('Updating table data');
    });
  };

  const handleRemoveColumn = (e: any) => {
    let val = e.target.innerHTML as string;
    const tmp = [...selectedColumns] as Array<string>;
    tmp.splice(tmp.indexOf(val.replace('col-', '')), 1);
    callBackend(selectedCountries, tmp);
  };

  const handleRemoveCountry = (e: any) => {
    let val = e.target.id as string;
    val = val.replace('row-head-', '');
    const tmp = [...selectedCountries] as Array<string>;
    for (let i = 0; i < tmp.length; i++) {
      console.log(tmp[i]);
      if (tmp[i] === val) {
        tmp.splice(i, 1);
        break;
      }
    }
    callBackend(tmp, selectedColumns);
  };

  return (
    <Flex justifyContent="center">
      <Flex width="100%" maxWidth="1200px" bgColor="#212427" flexDirection="column">
        <Flex mb={0} ml={1} mr={1} border="2px solid #38393E" flexDirection="column" pt={8} pl={10} pr={10} bg="#202125" height="780px" borderRadius="15px">
          <Flex p={0} borderRadius="12px" border="2px solid #38393E" flexDirection="column" height="700px" bg="#2B2C31">
            <Flex p={2.5} borderTopRadius="10px" height="40px" bg="#202125">
              <Text color="white" fontWeight={800} align="center">
                <MdCompareArrows />
              </Text>
              <Text ml={1.5} mt={-1} fontWeight={800} color="white">
                Compare Country
              </Text>
              <Box onClick={() => router.push('/')} _hover={{ cursor: 'pointer' }} mt={-1} borderRadius="10px" ml="auto" border="2px solid #38393E" height="25px" width="180px">
                <Text ml={2.5} mt={-0.5} fontWeight={800} color="white" mr={0}>
                  ← Back to Dashboard
                </Text>
              </Box>
            </Flex>
            <Flex flexDir="column" p={5} pl={6} pr={3} flexDirection="row" width="100%">
              <Text color="white" ml={5} mb={5} fontWeight={600}>
                The Compare Country widget uses data from the Global Economy database to compare over 200 countries in terms of their Happiness Index, GDP, Cost of Living Index, among 300+ other metrics. This enables users to get a broad sense of how countries rank in terms of the quality of life and environmental factors. Users can also compare individual countries side-by-side to see how they rank on specific metrics.
              </Text>

              <Flex ml={6} flexDirection="row" mb={4}>
                <Text color="white" fontWeight={800} fontSize="12pt">
                  Add Country for comparison
                </Text>
                <Text ml="232px" mr={10} color="white" fontWeight={800} fontSize="12pt">
                  Add Comparison Metric
                </Text>
              </Flex>

              <Flex flexDirection="row">
                <Box w={400} ml={5}>
                  <Select borderColor="#38393E" border="2px solid" _placeholder={{ fontWeight: 'bold' }} bg="#202125" placeholder="Select Country" color="white" onChange={handleSelectCountry}>
                    {countries.map((country: any) => (
                      <option key={country['Code']} value={country['Code']}>
                        {country['Country']}
                      </option>
                    ))}
                  </Select>
                </Box>

                <Flex ml={5} w={400}>
                  <Select borderColor="#38393E" border="2px solid" placeholder="Add Comparison" bg="#202125" color="white" onChange={handleSelectColumn} ml={3} mr={5}>
                    {columnOptions.map((col) => (
                      <option key={'select-' + col} value={col}>
                        {col}
                      </option>
                    ))}
                  </Select>
                </Flex>
              </Flex>

              <Flex justifyContent="center" m={5}>
                <Table borderBottom="1px solid white">
                  <Thead bg="#202125">
                    <Tr>
                      <Th color="white" fontWeight={800}>
                        Country
                      </Th>
                      {selectedColumns.map((col) => (
                        <Th _hover={{ cursor: 'pointer', backgroundColor: 'red.400' }} color="white" fontWeight={800} key={'col-' + col} onClick={handleRemoveColumn}>
                          {col}
                        </Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {tableData.map((value) => (
                      <Tr key={'row-' + value.Country}>
                        <Td borderBottom="0px" borderTop="1px" bg="#292a2e" onClick={handleRemoveCountry} _hover={{ backgroundColor: 'red.400', cursor: 'pointer' }} id={'row-head-' + value.Code}>
                          {value.Country}
                        </Td>
                        {selectedColumns.map((col) => (
                          <Td borderBottom="0px" borderTop="1px" bg="#292a2e" key={col + '-' + value['Country']}>
                            {value[col]}
                          </Td>
                        ))}
                      </Tr>
                    ))}
                    <Tr></Tr>
                  </Tbody>
                </Table>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Compare;
