import { Layout } from "antd";
import { useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import SiderComponent from "../../components/sider/Sider";
import Header from "../../components/header/Header";

export const SearchContext = createContext();

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleSearch = (term) => {
    setSearchQuery(term);
  };

  return (
    <SearchContext.Provider value={searchQuery}>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderComponent collapsed={collapsed} />
        <Layout>
          <Header
            collapsed={collapsed}
            toggleCollapsed={toggleCollapsed}
            onSearch={handleSearch}
            searchQuery={searchQuery}
          />
          <Layout.Content style={{ padding: "20px" }}>
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </SearchContext.Provider>
  );
};

export default Dashboard;
