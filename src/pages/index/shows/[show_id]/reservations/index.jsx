import React, { useState } from 'react'

import { useParams } from 'react-router-dom'
import { isArray } from 'lodash'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue } from '@chakra-ui/react'

import showApi from '@apis/show'
import { useForm } from 'react-hook-form'
import MyTicket from '@components/MyTicket'

const ReservationsPage = () => {
    const [mytickets, setMytickets] = useState([])

    const parmas = useParams()
    const showId = parmas.show_id

    const {
        register,
        formState: { isSubmitting },
        handleSubmit,
    } = useForm()

    const getRevensionsHandler = async data => {
        const { seat_codes, phone_number } = data
        try {
            const res = await showApi.getReservations(showId, { seat_codes, phone_number })

            setMytickets(isArray(res.data.reservations) ? res.data.reservations : [])
        } catch (err) {}
    }

    const renderMyTickets = () => {
        return mytickets.map((item, index) => {
            return <MyTicket key={index} data={item} />
        })
    }

    if (!showId) {
        return <div>no show id</div>
    }

    return (
        <Flex flexDirection="column" flex={1} align={'center'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} w="md" maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'2xl'}>Tìm thông tin vé của bạn</Heading>
                </Stack>
                <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Số điện thoại</FormLabel>
                            <Input
                                type="number"
                                {...register('phone_number', {
                                    required: true,
                                    pattern: {
                                        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                                        message: 'Số điện thoại không hợp lệ',
                                    },
                                })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Mã ghế</FormLabel>
                            <Input {...register('seat_codes', {})} />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button isLoading={isSubmitting} onClick={() => handleSubmit(getRevensionsHandler)()}>
                                Tìm vé
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>

            <Box>{renderMyTickets()}</Box>
        </Flex>
    )
}

export default ReservationsPage
