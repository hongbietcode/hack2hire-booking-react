import { BASE_URL_KEY, DEFAULT_BASE_URL, STORAGE_TOKEN_KEY } from './constants'

export const tokenHelper = {
    get: () => localStorage.getItem(STORAGE_TOKEN_KEY) || undefined,
    set: token => !token || localStorage.setItem(STORAGE_TOKEN_KEY, token),
}

export const baseUrlHelper = {
    get: () => localStorage.getItem(BASE_URL_KEY) || DEFAULT_BASE_URL,
    set: baseUrl => {
        !baseUrl || localStorage.setItem(BASE_URL_KEY, baseUrl)
        const event = new StorageEvent('storage', { key: BASE_URL_KEY, newValue: baseUrl })
        window.dispatchEvent(event)
    },
}
