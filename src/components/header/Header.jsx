/* eslint-disable react/prop-types */
import { Menu, Button, Input, Avatar } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";

const Header = ({ collapsed, toggleCollapsed, onSearch }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleAvatarClick = () => {
    navigate("/dashboard/user-settings");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const [data, loading] = useFetch("/auth/profile");

  return (
    <div style={{ display: "flex", alignItems: "center", background: "#001529", padding: "0 16px", height: "64px" }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{ fontSize: "16px", color: "white", marginRight: "16px", backgroundColor: "#1677ff", borderRadius: "4px", padding: "6px 20px" }}
      />
      <Input
        placeholder="Search..."
        prefix={<SearchOutlined />}
        value={search}
        onChange={handleSearchChange}
        style={{ width: 300, marginRight: "16px" }}
      />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={[
          { key: "1", label: "Item 1" },
          { key: "2", label: "Item 2" },
          { key: "3", label: "Item 3" },
        ]}
        style={{ flex: 1 }}
      />
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "16px", cursor: "pointer" }}
        onClick={handleAvatarClick}
      >
        {loading ? (
          <p style={{ color: "white" }}>Loading...</p>
        ) : (
          <>
            <span style={{ color: "white", marginRight: "8px" }}>{data?.first_name}</span>
            <Avatar style={{ width: 40, height: 40 }} className="bg-green-400">
              {data?.first_name?.[0]}
            </Avatar>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
