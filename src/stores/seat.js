import { FETCH_STATUS } from '@utils/constants'
import { atom } from 'jotai'

export const seatsAtom = atom({
    total: 0,
    seat_list: [],
    state: FETCH_STATUS.IDLE,
    error: null,
})

export const refreshSeatAtom = atom({})
