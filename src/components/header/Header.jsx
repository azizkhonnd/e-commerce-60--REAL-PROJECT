/* eslint-disable react/prop-types */
import { Menu, Button, Avatar, Select } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../api";

const Header = ({ collapsed, toggleCollapsed, onSearch }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/product/all');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get('/auth/profile');
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchProducts();
    fetchUserData();
  }, []);

  const handleAvatarClick = () => {
    navigate("/dashboard/user-settings");
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    onSearch(value);
  };

  const handleSelectProduct = (value) => {
    navigate(`/product/${value}`);
  };

  const options = products.map((product) => ({
    value: product._id,
    label: product.product_name,
  }));

  return (
    <div style={{ display: "flex", alignItems: "center", background: "#001529", padding: "0 16px", height: "64px" }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{ fontSize: "16px", color: "white", marginRight: "16px", backgroundColor: "#1677ff", borderRadius: "4px", padding: "6px 20px" }}
      />
      <Select
        mode="tags"
        showSearch
        value={search}
        placeholder="Search products"
        style={{ width: 300, marginRight: "16px" }}
        onChange={handleSearchChange}
        onSelect={handleSelectProduct}
        filterOption={(input, option) =>
          option.label.toLowerCase().includes(input.toLowerCase())
        }
        options={options}
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
            <span style={{ color: "white", marginRight: "8px" }}>{userData?.first_name}</span>
            <Avatar style={{ width: 40, height: 40 }} className="bg-green-400">
              {userData?.first_name?.[0]}
            </Avatar>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
