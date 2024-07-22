/* eslint-disable no-unused-vars */

import { Layout } from "antd"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sider from "../../components/sider/Sider"

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false)
    return (

        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsed={collapsed} />
            <Outlet />
        </Layout>
    )
}

export default Dashboard