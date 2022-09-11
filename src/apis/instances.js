import { BASE_URL_KEY } from '@utils/constants'
import { baseUrlHelper, tokenHelper } from '@utils/helper'
import axios from 'axios'
import get from 'lodash/get'

const getAxiosInstance = (auth = false) => {
    const instance = axios.create({ baseURL: baseUrlHelper.get(), timeout: 30 * 1000 })

    const getUrl = (config = {}) => {
        if (config.baseURL) return config.url?.replace(config.baseURL, '').split('?')[0]
        return config.url
    }

    const requestInterceptor = async config => {
        const url = getUrl(config)

        if (auth) {
            const token = tokenHelper.get()
            console.log(`%c ${url} - token: `, 'color: #0086b3; font-weight: bold', token)

            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            } else {
                throw new Error('Token not found')
            }
        }

        console.log(`%c ${config.method?.toUpperCase()} - ${url}: `, 'color: #0086b3; font-weight: bold', config)

        return config
    }
    const requestErrorInterceptor = error => {
        console.log(`%c ${error.response?.status}: `, 'color: red; font-weight: bold', error.response?.data)
        return Promise.reject(error)
    }

    const responseInterceptor = response => {
        console.log(
            ` %c ${response.status} - ${getUrl(response.config)}:`,
            'color: #008000; font-weight: bold',
            response
        )

        return response.data
    }
    const responseErrorInterceptor = error => {
        if (error.response) {
            console.log(
                `%c ${error.response.status}-${getUrl(error.response.config)}:`,
                'color: red; font-weight: bold',
                error.response.data
            )
        } else if (error.request) {
            console.log(
                `%c ${error.request.status}-${getUrl(error.request.config)}:`,
                'color: red; font-weight: bold',
                error.request.data
            )
        } else {
            console.log(
                `%c ${error.message}:`,
                'color: red; font-weight: bold',
                'An error occurred while sending the request'
            )
        }

        const message = get(error, 'response.data.meta.message') || error.message || "Can't connect to server"

        window.showToast({ description: message, status: 'error' })

        return Promise.reject(error)
    }

    instance.interceptors.request.use(requestInterceptor, requestErrorInterceptor)
    instance.interceptors.response.use(responseInterceptor, responseErrorInterceptor)

    return instance
}

export const publicRequester = getAxiosInstance()
export const privateRequester = getAxiosInstance(true)

class ApiInstance {
    constructor() {
        window.addEventListener('storage', e => {
            if (e.key === BASE_URL_KEY) {
                ApiInstance.publicRequester = null
                ApiInstance.privateRequester = null
            }
        })
    }

    /**
     * @returns {import('axios').AxiosInstance}
     */
    get public() {
        if (!ApiInstance.publicRequester) {
            ApiInstance.publicRequester = getAxiosInstance()
        }
        return ApiInstance.publicRequester
    }

    /**
     * @returns {import('axios').AxiosInstance}
     */
    get private() {
        if (!ApiInstance.privateRequester) {
            ApiInstance.privateRequester = getAxiosInstance(true)
        }
        return ApiInstance.privateRequester
    }
}

const apiInstance = new ApiInstance()

export default apiInstance
