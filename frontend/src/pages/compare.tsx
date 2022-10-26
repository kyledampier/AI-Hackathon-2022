import type { NextPage } from 'next'
import { useState } from 'react'
import { Flex, Text, Box, Button, Modal } from '@chakra-ui/react'

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


const Test: NextPage = () => {

    return (
        <Flex justifyContent="center" m={5}>
            <table>
                <thead>
                    <tr>
                        {Object.keys(input_example[0]).map((key) => (
                            <th>{key}</th>
                        ))}
                        <th> <Button bg="gray.700"> Add Variable </Button> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr> 
                        {Object.values(input_example[0]).map((value) => (
                            <td>{value}</td>
                        ))}
                        <td> - </td>
                    </tr>
                </tbody>
            </table>
        </Flex>
    )
}

export default Test

