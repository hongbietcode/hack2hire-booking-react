import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Box, Text, useColorModeValue, Image, Flex, Button, Tooltip } from '@chakra-ui/react'
import { appImages } from '@src/assets'

const BookingShowItem = ({ data }) => {
    const [image, setImage] = React.useState('')

    const startDate = moment(data.start_date).format('DD/MM/YYYY - hh:mm')

    useEffect(() => {
        setImage(data.image_url)
    }, [data.show_image])

    const onImageLoadError = e => setImage('https://via.placeholder.com/865x487')

    return (
        <Flex
            gap={4}
            w={'full'}
            transition={'all .3s ease'}
            _hover={{ transform: 'translateY(-5px) scale(1.1)', boxShadow: 'xl' }}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'sm'}
            rounded={'md'}
            overflow={'hidden'}
            mb="6"
            flexDirection={{ base: 'column', md: 'row' }}
            p={4}
        >
            <Box w={{ base: '100%', md: '320px' }} bg={'gray.100'} pos={'relative'}>
                <Image rounded={'md'} style={{ aspectRatio: 865 / 487 }} src={image} onError={onImageLoadError} />
            </Box>

            <Flex flex="1" flexDirection="column">
                <Box flex="1">
                    <Text fontSize="xl" fontWeight="medium">
                        {data.name}
                    </Text>
                    <Text fontWeight="semibold" fontSize="sm" color="gray.500">
                        Ngày biểu diễn: {startDate}
                    </Text>
                </Box>

                <Flex gap={4} flexDirection="row-reverse">
                    <Button colorScheme="linkedin" borderRadius="sm">
                        <Link to={`/shows/${data.show_id}/seats`}>Đặt chỗ ngay</Link>
                    </Button>

                    <Tooltip label="Vé của tôi">
                        <Link to={`/shows/${data.show_id}/reservations`}>
                            <Button id="changeTheme">
                                <Image w={'16px'} h={'16px'} src={appImages.ticket} />
                            </Button>
                        </Link>
                    </Tooltip>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default BookingShowItem
