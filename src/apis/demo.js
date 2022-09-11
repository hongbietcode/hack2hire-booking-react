import apiInstance from './instances'

const demoApi = {
    get: () => {
        return apiInstance.public.get('/booking/messages/123')
    },
}

export default demoApi
