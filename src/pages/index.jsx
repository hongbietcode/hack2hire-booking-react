import React, { Fragment, useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import { useAtom } from 'jotai'
import { isArray } from 'lodash'

import { NavBar } from '@components'
import { Container } from '@chakra-ui/react'
import { showsAtom } from '@stores/show'
import showApi from '@apis/show'
import { FETCH_STATUS } from '@utils/constants'

const IndexPage = () => {
    const [, setShows] = useAtom(showsAtom)

    useEffect(() => {
        getShowsHandler()
    }, [])

    // handler
    const getShowsHandler = async () => {
        setShows(cur => ({
            ...cur,
            state: FETCH_STATUS.LOADING,
        }))
        try {
            const res = await showApi.getShows()

            setShows(cur => ({
                ...cur,
                total: res.data.total,
                shows: res.data && isArray(res.data.shows) ? res.data.shows : [],
                state: FETCH_STATUS.SUCCESS,
            }))
        } catch (err) {
            setShows(cur => ({
                ...cur,
                state: FETCH_STATUS.ERROR,
                error: err,
            }))
        }
    }

    return (
        <Fragment>
            <NavBar />
            <Container maxW="container.xl" p="4">
                <Outlet />
            </Container>
        </Fragment>
    )
}

export default IndexPage
