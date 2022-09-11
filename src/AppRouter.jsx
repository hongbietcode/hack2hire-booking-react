import React from 'react'

import { useAtom } from 'jotai'
import { useRoutes } from 'react-router-dom'
import get from 'lodash/get'

import routers from '~react-pages'
import userAsyncAtom from '@stores/user'

import 'tailwindcss/tailwind.css'

const AppRouter = () => {
    const [user] = useAtom(userAsyncAtom)

    const getAppRoutes = () => {
        return routers.filter(router => {
            const requiresAuth = get(router, 'meta.requiresAuth', false)

            if (requiresAuth) {
                return user && user.admin
            }

            return true
        })
    }

    return <React.Fragment>{useRoutes(getAppRoutes())}</React.Fragment>
}

export default AppRouter
