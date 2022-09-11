import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'

import App from './App'
import theme from './theme'

const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
    <ChakraProvider theme={theme}>
        <HashRouter>
            <App />
        </HashRouter>
    </ChakraProvider>
)

// clear log
if (process.env.NODE_ENV !== 'development') {
    console.log = () => {}
    console.warn = () => {}
    console.error = () => {}
    console.info = () => {}
}
