/* eslint-disable no-unused-vars */
import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SiderComponent from "../../components/sider/Sider";
import Header from "../../components/header/Header";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderComponent collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <Layout.Content style={{ padding: "20px" }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
