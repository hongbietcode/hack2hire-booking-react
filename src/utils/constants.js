export const BASE_URL_KEY = 'base_url'
export const STORAGE_TOKEN_KEY = 'token'

export const DEFAULT_BASE_URL = import.meta.env.OM_BASE_URL

export const FETCH_STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
}

export const SEAT_STATUS = {
    BOOKED: {
        value: 'BOOKED',
        label: 'Đã đặt',
        bg: 'pink.500',
        textColor: 'white',
        cursor: 'not-allowed',
        hoverBg: 'pink.500',
    },
    AVAILABLE: {
        value: 'AVAILABLE',
        label: 'Còn trống',
        bg: 'gray.100',
        textColor: 'black',
        cursor: 'pointer',
        hoverBg: 'gray.200',
    },

    SELECTED: {
        value: 'SELECTED',
        label: 'Đang chọn',
        bg: 'blue.500',
        textColor: 'white',
        cursor: 'pointer',
        hoverBg: 'blue.600',
    },
}
