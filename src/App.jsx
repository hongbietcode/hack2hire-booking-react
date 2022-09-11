import React from 'react'

import { createStandaloneToast, Spinner } from '@chakra-ui/react'
import debouce from 'lodash/debounce'

import { ErrorBoundary } from '@components'
import AppRouter from './AppRouter'

import 'tailwindcss/tailwind.css'

const { ToastContainer, toast } = createStandaloneToast()

window.showToast = debouce((options = {}) => {
    const defaultOptions = { duration: 9000, isClosable: true, position: 'bottom-right' }

    return toast({ ...defaultOptions, ...options })
}, 500)

const App = () => {
    const Loading = () => {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        )
    }

    return (
        <ErrorBoundary>
            <ToastContainer />
            <React.Suspense fallback={<Loading />}>
                <AppRouter />
            </React.Suspense>
        </ErrorBoundary>
    )
}

export default App
