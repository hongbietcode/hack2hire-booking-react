import { Box, Text } from '@chakra-ui/react'
import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box flex={1} justifyContent="center" alignItems="center">
                    <Text>Something went wrong.</Text>
                </Box>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
