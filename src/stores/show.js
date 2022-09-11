import { FETCH_STATUS } from '@utils/constants'
import { atom } from 'jotai'

export const showsAtom = atom({
    total: 0,
    shows: [],
    state: FETCH_STATUS.IDLE,
    error: null,
})
