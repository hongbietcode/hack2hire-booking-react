const { theme } = require('@chakra-ui/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: { colors: theme.colors },
    },
    plugins: [],
    darkMode: 'class',
}
