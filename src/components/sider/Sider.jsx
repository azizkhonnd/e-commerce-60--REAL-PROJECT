/* eslint-disable react/prop-types */

import { Layout, Menu, Typography } from "antd";
import { NavLink } from "react-router-dom"
import { BsDropbox } from "react-icons/bs";
import {
    UsergroupAddOutlined
} from '@ant-design/icons';

const { Sider } = Layout

const { Title } = Typography

const SiderComponent = ({ collapsed }) => {
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <Title level={3} className="text-center pt-3"><span className="text-white">Logo</span></Title>
            <Menu
                theme="dark"
                mode="inline"
                items={[
                    {
                        key: '1',
                        icon: <BsDropbox />,
                        label: <NavLink end className={"sidebar__link"} to="/dashboard">Products</NavLink>,
                    },
                    {
                        key: '2',
                        icon: <UsergroupAddOutlined />,
                        label: <NavLink className={"sidebar__link"} to="/dashboard/users">Users</NavLink>,
                    }
                ]}
            />
        </Sider>
    )
}

export default SiderComponent