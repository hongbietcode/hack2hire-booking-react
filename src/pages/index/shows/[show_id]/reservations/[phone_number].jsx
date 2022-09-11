import showApi from '@apis/show'
import { Box, Flex } from '@chakra-ui/react'
import MyTicket from '@components/MyTicket'
import { isArray } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const TicketPage = () => {
    const [mytickets, setMytickets] = useState([])

    const parmas = useParams()
    const showId = parmas.show_id
    const phone_number = parmas.phone_number

    useEffect(() => {
        showId && phone_number && getRevensionsHandler()
    }, [])

    const getRevensionsHandler = async () => {
        try {
            const res = await showApi.getReservations(showId, { phone_number, seat_codes: '' })
            console.log(res)
            setMytickets(isArray(res.data.reservations) ? res.data.reservations : [])
        } catch (err) {
            window.showToast({ title: 'Lỗi', description: 'Không thể lấy thông tin vé', status: 'error' })
        }
    }

    const renderMyTickets = () => {
        return mytickets.map((item, index) => {
            return <MyTicket key={index} data={item} />
        })
    }

    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
            {renderMyTickets()}
        </Flex>
    )
}

export default TicketPage
