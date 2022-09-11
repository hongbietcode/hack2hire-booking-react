import React from 'react'

import { seatsAtom } from '@stores/seat'
import { useAtom } from 'jotai'
import SeatItem from '@components/SeatItem'
import { Flex, Box, Text, Button, Grid, GridItem } from '@chakra-ui/react'
import { SEAT_STATUS } from '@utils/constants'

const SeatMatrix = ({ seatPerRow = 10, total = 100, onReservations, onChooseSeat, selectedSeats }) => {
    const [seats] = useAtom(seatsAtom)

    const renderMatrix = () => {
        const seatItems = []

        for (let i = 0; i < total; i++) {
            const data = seats.seat_list[i]
            const selected = selectedSeats.includes(data.seat_code)

            seatItems.push(
                <GridItem rowSpan={1} colSpan={1} key={`seat_${i}`}>
                    <SeatItem onClick={() => onChooseSeat(data.seat_code)} data={data} selected={selected} />
                </GridItem>
            )
        }

        return seatItems
    }

    return (
        <Box>
            <Box bg="white" p="4" borderRadius="sm" shadow="sm" mb="4">
                <Flex mb="4" h="16" bg="blue.200" justifyContent="center" alignItems="center" rounded="sm">
                    <Text fontSize="md" fontWeight="bold">
                        Sân khấu
                    </Text>
                </Flex>
                <Flex mb="4" justifyContent="flex-end">
                    <Flex gap="4">
                        {Object.values(SEAT_STATUS).map((value, index) => (
                            <Box key={index} minW="20" p="1" bg={value.bg} rounded="sm">
                                <Text textColor={value.textColor} fontSize="xs" textAlign="center">
                                    {value.label}
                                </Text>
                            </Box>
                        ))}
                    </Flex>
                </Flex>
            </Box>
            <Grid
                templateRows="repeat(4, 1fr)"
                templateColumns="repeat(4, 1fr)"
                gap={4}
                bg="white"
                p="4"
                borderRadius="sm"
                shadow="sm"
            >
                {renderMatrix()}
            </Grid>

            <Flex bg="white" p="4" borderRadius="sm" shadow="sm" mt="4" flexDirection="row-reverse">
                <Button onClick={() => onReservations()} colorScheme="linkedin" isDisabled={selectedSeats.length === 0}>
                    Đặt chỗ ({selectedSeats.length})
                </Button>
            </Flex>
        </Box>
    )
}

export default SeatMatrix
