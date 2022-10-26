import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td, Select } from '@chakra-ui/react'

const input_example = [
    {
        "country": "Afghanistan",
        "year": 2000,
        "population": 20000000,
        "gdp": 1000000000
    },
    {
        "country": "United States",
        "year": 2000,
        "population": 20000000,
        "gdp": 1000000000
    },
]

interface Country { 
    Country: string,
    Code: string,
    ContinentCode: string
}

const Test: NextPage = () => {

    const [countries, setCountries] = useState<Array<Country>>([])
    const [selectedCountries, setSelectedCountries] = useState<Array<string>>([])

    const [columnOptions, setColumnOptions] = useState<Array<string>>([])
    const [selectedColumns, setSelectedColumns] = useState<Array<string>>([])

    const [tableData, setTableData] = useState<Array<any>>([])

    useEffect(() => {
        fetch("http://localhost:8080/countries").then(async (response) => {
            const columns = await fetch("http://localhost:8080/columns")
            const columnOptions = await columns.json()
            const cntrys = await response.json()
            setCountries(cntrys)
            setColumnOptions(columnOptions)
            callBackend(selectedCountries, selectedColumns)
        })
    }, [])

    const callBackend = async (country_codes : Array<string>, cols: Array<string>) => {
        const request = await fetch(`http://localhost:8080/compare`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                'country_codes': country_codes,
                'columns': cols
            })
        })
        const data = await request.json()
        console.log(data)
        setSelectedColumns(cols)
        setSelectedCountries(country_codes)
        setTableData(data)
    }

    const handleSelectCountry = (e : React.ChangeEvent<HTMLFormElement>) => {
        const val = e.target.value as string;
        const tmp = [... selectedCountries] as Array<string>
        tmp.push(val)
        callBackend(tmp, selectedColumns)
    }

    const handleSelectColumn = (e : React.ChangeEvent<HTMLFormElement>) => {
        const val = e.target.value as string;
        const tmp = [... selectedColumns] as Array<string>
        tmp.push(val)
        callBackend(selectedCountries, tmp).then(() => { console.log("Updating table data") })
    }

    const handleRemoveColumn = (e : React.ChangeEvent<HTMLFormElement>) => {
        let val = e.target.innerHTML as string
        const tmp = [... selectedColumns] as Array<string>
        tmp.splice(tmp.indexOf(val.replace("col-", "")), 1)
        callBackend(selectedCountries, tmp)
    }

    const handleRemoveCountry = (e : any) => {
        let val = e.target.id as string
        val = val.replace("row-head-", "")
        const tmp = [... selectedCountries] as Array<string>
        for (let i = 0; i < tmp.length; i++) {
            console.log(tmp[i])
            if (tmp[i] === val) {
                tmp.splice(i, 1)
                break
            }
        }
        callBackend(tmp, selectedColumns)
    }

    
    return (
        <div>
            <Flex ml="auto" w={400}>
                <Select placeholder='Add Comparison' bg="lightgray" color="black" onChange={handleSelectColumn} variant='filled' ml={3} mr={5}>
                    {columnOptions.map((col) => (
                        <option key={"select-" + col} value={col}>{col}</option>
                    ))}
                </Select>
            </Flex>
            <Flex justifyContent="center" m={5}>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Country</Th>
                            {selectedColumns.map((col) => (
                                <Th key={'col-' + col} onClick={handleRemoveColumn} _hover={{ backgroundColor: "red.400"}}>{col}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>

                        {tableData.map((value) => (
                            <Tr key={"row-" + value.Country}>
                                <Td onClick={handleRemoveCountry} _hover={{ backgroundColor: "red.600"}} id={"row-head-" + value.Code}>{value.Country}</Td>
                                {selectedColumns.map((col) => (
                                    <Td key={col + '-' + value['Country']}>{value[col]}</Td>
                                ))}
                            </Tr>
                        ))}
                        <Tr>
                            
                        </Tr>
                    </Tbody>
                </Table>
            </Flex>
            <Box w={400} m={5}>
                <Select placeholder='Select Country' bg="white" color="black" onChange={handleSelectCountry}>
                    {countries.map((country: any) => (
                        <option key={country['Code']} value={country['Code']}>{country['Country']}</option>
                    ))}
                </Select>
            </Box>
        </div>
    )
}

export default Test

