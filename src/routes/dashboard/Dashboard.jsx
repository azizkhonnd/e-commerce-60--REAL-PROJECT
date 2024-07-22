import { Layout, Sider, Header, Menu } from "antd"
import { useState } from "react"
const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false)
    return (

        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    theme="dark"
                    mode="inline"
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: <NavLink className={"sidebar__link"} to="/admin/product">Products</NavLink>,
                        },
                        {
                            key: '2',
                            icon: <UsergroupAddOutlined />,
                            label: <NavLink className={"sidebar__link"} to="/admin/promoted">Promoted</NavLink>,
                        },
                        {
                            key: '3',
                            icon: <VideoCameraOutlined />,
                            label: <NavLink className={"sidebar__link"} to="/admin/users">Users</NavLink>,
                        }
                    ]}
                />
            </Sider>
        </Layout>
    )
}

export default Dashboard