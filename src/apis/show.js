import apiInstance from './instances'

const prefix = 'booking/shows'

const showApi = {
    getShows: () => {
        return apiInstance.public.get(`/${prefix}`)
    },

    getSeats: showId => {
        return apiInstance.public.get(`/${prefix}/${showId}/seats`)
    },

    reservations: (showId, data) => {
        return apiInstance.public.post(`/${prefix}/${showId}/reservations`, data)
    },

    getReservations: (showId, { seat_codes, phone_number }) => {
        return apiInstance.public.get(
            `/${prefix}/${showId}/reservations?seat_codes=${seat_codes}&phone_number=${phone_number}`
        )
    },

    cancelReservation: (showId, reservation_code, data) => {
        return apiInstance.public.put(`/${prefix}/${showId}/reservations/${reservation_code}`, data)
    },
}

export default showApi
