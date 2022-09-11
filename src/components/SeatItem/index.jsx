import { Flex } from '@chakra-ui/react'
import { SEAT_STATUS } from '@utils/constants'
import React from 'react'

const SeatItem = ({ data, onClick, selected = false }) => {
    const { seat_code, status } = data || {}

    const theme = selected ? SEAT_STATUS.SELECTED : SEAT_STATUS[status] || SEAT_STATUS.BOOKED

    return (
        <Flex
            _hover={{ bg: theme.hoverBg }}
            cursor={theme.cursor}
            onClick={status !== SEAT_STATUS.BOOKED.value ? onClick : null}
            justifyContent="center"
            alignItems="center"
            bg={theme.bg}
            textColor={theme.textColor}
            rounded="sm"
            h="16"
        >
            <div>{seat_code}</div>
        </Flex>
    )
}

export default SeatItem
