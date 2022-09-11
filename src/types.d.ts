import { CreateToastFnReturn } from '@chakra-ui/react'

declare global {
    interface Window {
        showToast: CreateToastFnReturn
    }
}
