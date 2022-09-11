import showApi from '@apis/show'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Text,
    useClipboard,
    useDisclosure,
    Input,
    Badge,
} from '@chakra-ui/react'
import React from 'react'
import QRCode from 'react-qr-code'
import { useParams } from 'react-router-dom'
import moment from 'moment'

const MyTicket = ({ data }) => {
    const { hasCopied, onCopy } = useClipboard(data.code)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const reasonRef = React.useRef()

    const parmas = useParams()

    const showId = parmas.show_id

    const status = data.status === 'ACCEPTED' ? 'Đã đặt' : 'Đã hủy'

    const onCancle = () => {
        showApi
            .cancelReservation(showId, data.code, {
                canceled_reason: reasonRef.current,
                status: 'CANCELED',
                canceled_date: moment.now().valueOf(),
            })

            .then(res => {
                window.showToast({ title: 'Thành công', description: 'Hủy vé thành công', status: 'success' })
                onClose()
                window.location.reload()
            })
            .catch(() => {
                window.showToast({ title: 'Lỗi', description: 'Hủy vé thất bại', status: 'error' })
                onClose()
            })
    }

    return (
        <Box w="lg" mb={4} p={4} bg="white" shadow="sm" rounded="sm">
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Huỷ vé
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <FormControl>
                                <FormLabel>Lý do huỷ</FormLabel>
                                <Input
                                    onChange={e => {
                                        reasonRef.current = e.target.value
                                    }}
                                />
                            </FormControl>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Thôi huỷ
                            </Button>
                            <Button colorScheme="red" onClick={onCancle} ml={3}>
                                Huỷ luôn
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <Box mb={4}>
                <Text>Họ và tên: {data.user?.name}</Text>
                <Text>SĐT: {data.user?.phone_number}</Text>
                <Text>Mã ghế: {data.seat_code}</Text>
                {/* <Text>Mã vé: {data.code}</Text> */}
                <Text>
                    Trạng thái:
                    <Badge ml={2} colorScheme={data.status === 'ACCEPTED' ? 'green' : 'red'}>
                        {status}
                    </Badge>
                </Text>
            </Box>

            <Flex justifyContent="center">
                <QRCode width={8} height={80} value={data.code} />
            </Flex>

            <Flex direction="row-reverse" gap={4} mt={4}>
                <Button onClick={onCopy}>{hasCopied ? 'Đã sao chép' : 'Sao chép URL'}</Button>
                {data.status === 'ACCEPTED' && (
                    <Button colorScheme="red" ml={2} onClick={onOpen}>
                        Hủy vé
                    </Button>
                )}
            </Flex>
        </Box>
    )
}

export default MyTicket
