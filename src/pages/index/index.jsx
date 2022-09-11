import React from 'react'

import { useAtom } from 'jotai'
import { Box } from '@chakra-ui/react'

import { showsAtom } from '@stores/show'
import { FETCH_STATUS } from '@utils/constants'
import { BookingShowItem } from '@components'

const AboutPage = () => {
    const [shows] = useAtom(showsAtom)

    const renderShows = () => {
        if (shows.total <= 0) {
            return <div>no shows</div>
        }

        return shows.shows.map((show, index) => <BookingShowItem key={`show_${show.show_id}_${index}`} data={show} />)
    }

    if (shows.state === FETCH_STATUS.LOADING) {
        return <div>Loading...</div>
    }

    return <Box maxW="container.md">{renderShows()}</Box>
}

export default AboutPage
