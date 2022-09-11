import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { useParams } from 'react-router-dom'
import moment from 'moment'

import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    FormControl,
    FormLabel,
    Input,
    DrawerFooter,
    Button,
    HStack,
    Tag,
    TagLabel,
    Text,
    Stack,
    Heading,
    Flex,
    Image,
    FormErrorMessage,
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { showsAtom } from '@stores/show'

const BookingForm = ({ isOpenBookingForm, onCloseBookingForm, onSubmit, selectedSeats = [] }) => {
    const [shows] = useAtom(showsAtom)
    const params = useParams()
    const showId = params.show_id

    const [currentShow, setCurrentShow] = useState(null)

    const {
        register,
        formState: { isSubmitting, errors },
        handleSubmit,
    } = useForm()

    useEffect(() => {
        setCurrentShow(shows.shows.find(show => show.show_id === showId))
    }, [shows])

    const renderShowInfo = data => {
        const startDate = moment(data.start_date).format('DD/MM/YYYY - hh:mm')

        return (
            <FormControl mb="4">
                <FormLabel>Thông tin show diễn</FormLabel>
                <Stack borderWidth="1px" direction={{ base: 'column', md: 'row' }} bg={'white'} padding={4}>
                    <Flex flex={1} bg="blue.200">
                        <Image objectFit="cover" boxSize="100%" src={data.image_url} />
                    </Flex>

                    <Stack flex={1} flexDirection="column" justifyContent="center" alignItems="center" p={1} pt={2}>
                        <Heading textAlign="center" fontSize={'2xl'} fontFamily={'body'}>
                            {data.name}
                        </Heading>
                        <Text fontWeight="medium" color={'gray.500'} fontSize="sm" mb={4}>
                            Ngày biểu diễn: {startDate}
                        </Text>
                        <Text fontWeight="medium" color={'gray.500'} fontSize="sm" mb={4}>
                            Mã ghế:
                        </Text>
                        <HStack spacing={4}>
                            {selectedSeats.map(seat_code => (
                                <Tag size="lg" key={seat_code} variant="solid" colorScheme="green">
                                    <TagLabel>{seat_code}</TagLabel>
                                </Tag>
                            ))}
                        </HStack>
                    </Stack>
                </Stack>
            </FormControl>
        )
    }

    return (
        <Drawer onClose={onCloseBookingForm} isOpen={isOpenBookingForm} size={'lg'}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />

                <DrawerHeader>Thông tin đặt chỗ</DrawerHeader>
                <DrawerBody>
                    {currentShow && renderShowInfo(currentShow)}

                    <FormControl mb="4" isRequired>
                        <FormLabel>Họ và tên</FormLabel>
                        <Input
                            {...register('name', { required: { value: true, message: 'Vui lòng nhập họ và tên' } })}
                        />
                        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl mb="4">
                        <FormLabel>Số điện thoại</FormLabel>
                        <Input
                            type="number"
                            {...register('phone_number', {
                                pattern: {
                                    value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                                    message: 'Số điện thoại không hợp lệ',
                                },
                            })}
                        />
                        <FormErrorMessage>{errors.phone_number && errors.phone_number.message}</FormErrorMessage>
                    </FormControl>
                </DrawerBody>

                <DrawerFooter>
                    <Button
                        onClick={() => handleSubmit(onSubmit)()}
                        isLoading={isSubmitting}
                        loadingText="Đang đặt chỗ"
                        colorScheme="twitter"
                    >
                        Đặt chỗ
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default BookingForm
