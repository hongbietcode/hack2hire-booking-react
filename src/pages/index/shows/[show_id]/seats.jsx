import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { useNavigate, useParams } from 'react-router-dom'
import { isArray } from 'lodash'
import { Box, useDisclosure } from '@chakra-ui/react'

import { refreshSeatAtom, seatsAtom } from '@stores/seat'

import { FETCH_STATUS } from '@utils/constants'
import showApi from '@apis/show'
import { BookingForm, SeatMatrix } from '@components'

const SeatesPage = () => {
    const { isOpen: isOpenBookingForm, onOpen: onOpenBookingForm, onClose: onCloseBookingForm } = useDisclosure()
    const navigate = useNavigate()

    const [seats, setSeats] = useAtom(seatsAtom)
    const [refresh, setRefresh] = useAtom(refreshSeatAtom)
    const [selectedSeats, setSelectedSeats] = useState([])

    const parmas = useParams()
    const showId = parmas.show_id

    useEffect(() => {
        showId && getSeatsHandler(showId)
    }, [parmas, refresh])

    const getSeatsHandler = async showId => {
        setSeats(cur => ({ ...cur, state: FETCH_STATUS.LOADING }))
        try {
            const res = await showApi.getSeats(showId)

            setSeats(cur => ({
                ...cur,
                total: res.data.total,
                seat_list: res.data && isArray(res.data.seat_list) ? res.data.seat_list : [],
                state: FETCH_STATUS.SUCCESS,
            }))
        } catch (err) {
            setSeats(cur => ({
                ...cur,
                state: FETCH_STATUS.ERROR,
                error: err,
            }))
        }
    }

    const onChooseSeat = seat_code => {
        if (selectedSeats.includes(seat_code)) {
            setSelectedSeats(cur => cur.filter(item => item !== seat_code))
        } else {
            setSelectedSeats(cur => [...cur, seat_code])
        }
    }

    const onSubmit = async data => {
        try {
            if (selectedSeats.length === 0) {
                return
            }
            const res = await showApi.reservations(showId, {
                user: data,
                seat_codes: selectedSeats,
            })

            setSelectedSeats([])

            window.showToast({
                title: 'Đặt vé thành công',
                description: `Mã đặt vé của bạn là ${res.data.reservation_code}`,
            })

            onCloseBookingForm()

            navigate(`/shows/${showId}/reservations/${data.phone_number}`, { replace: true })
        } catch (err) {
            window.showToast({
                title: 'Đặt vé thất bại',
                description: err.message,
            })

            onCloseBookingForm()
            setSelectedSeats([])
        } finally {
            setRefresh({})
        }
    }

    if (!showId) {
        return <div>no show id</div>
    }

    return (
        <Box>
            <BookingForm
                selectedSeats={selectedSeats}
                isOpenBookingForm={isOpenBookingForm}
                onCloseBookingForm={onCloseBookingForm}
                onSubmit={onSubmit}
            />
            <SeatMatrix
                total={seats.total}
                seatPerRow={4}
                onReservations={onOpenBookingForm}
                onChooseSeat={onChooseSeat}
                selectedSeats={selectedSeats}
            />
        </Box>
    )
}

export default SeatesPage
