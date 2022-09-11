import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const styles = {
    global: props => ({
        body: {
            bg: mode('#f9fbfd', '#0d1117')(props),
        },
    }),
}

const components = {
    Button: {
        baseStyle: {
            borderRadius: 'sm',
        },
    },
}

const theme = extendTheme({ config, styles, components })

export default theme
