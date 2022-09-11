import React from 'react'

import { Outlet } from 'react-router-dom'

import { Layout } from '@components'

const AdminPage = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}

export default AdminPage
