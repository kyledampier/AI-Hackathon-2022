import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { Flex, Text, Box, Button, Modal, Select } from '@chakra-ui/react'

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

    useEffect(() => {
        fetch("http://localhost:8080/countries").then(async (response) => {
            const columns = await fetch("http://localhost:8080/columns")
            const columnOptions = await columns.json()

            response.json().then((data) => {
                setCountries(data)
                setColumnOptions(columnOptions)
            })
        })
    }, [])

    const handleSelectCountry = (e : React.ChangeEvent<HTMLFormElement>) => {
        const val = e.target.value as string;
        const tmp = [... selectedCountries] as Array<string>
        tmp.push(val)
        setSelectedCountries(tmp)
    }

    const handleSelectColumn = (e : React.ChangeEvent<HTMLFormElement>) => {
        const val = e.target.value as string;
        const tmp = [... selectedColumns] as Array<string>
        tmp.push(val)
        setSelectedColumns(tmp)
    }
    
    console.log(selectedCountries)
    console.log(columnOptions)
    return (
        <div>
            <Flex justifyContent="center" m={5}>

                <table>
                    <thead>
                        <tr>
                            {Object.keys(input_example[0]).map((key) => (
                                <th>{key}</th>
                            ))}
                            <th> 
                                <Select placeholder='Add Comparison' bg="lightgray" color="black" onChange={handleSelectColumn} variant='filled'>
                                    {columnOptions.map((col) => (
                                        <option key={col} value={col}>{col}</option>
                                    ))}
                                </Select>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr> 
                            {Object.values(input_example[0]).map((value) => (
                                <td>{value}</td>
                            ))}
                            <td> - </td>
                        </tr>
                        <tr>
                            <Select placeholder='Select Country' bg="white" color="black" onChange={handleSelectCountry}>
                                {countries.map((country) => (
                                    <option key={country['Code']} value={country['Code']}>{country['Country']}</option>
                                ))}
                            </Select>
                        </tr>
                    </tbody>
                </table>
            </Flex>
        </div>
    )
}

export default Test

