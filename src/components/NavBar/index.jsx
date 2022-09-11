import { useEffect } from 'react'
import { Box, Flex, Button, useColorModeValue, Stack, useColorMode, Container, Image } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { appImages } from '@src/assets'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    useEffect(() => {
        let htmlClasses = document.querySelector('html').classList

        if (colorMode === 'dark') {
            htmlClasses.add('dark')
        } else {
            htmlClasses.remove('dark')
        }
    }, [colorMode])

    return (
        <>
            <Box bg={useColorModeValue('white', 'gray.900')} shadow="sm">
                <Container maxW="container.xl" px={4}>
                    <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                        <Link to="/">
                            <Image maxH="60px" src={appImages.onemountLogo} />
                        </Link>

                        <Flex alignItems={'center'}>
                            <Stack direction={'row'} spacing={7}>
                                <Button id="changeTheme" onClick={toggleColorMode}>
                                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                                </Button>
                            </Stack>
                        </Flex>
                    </Flex>
                </Container>
            </Box>
        </>
    )
}

export default NavBar
