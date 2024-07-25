/* eslint-disable react/prop-types */
import { Button, Layout, Menu, Typography, Modal } from "antd";
import { NavLink } from "react-router-dom";
import { BsDropbox } from "react-icons/bs";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { SIGN_OUT } from "../../redux/actions/action-types";

const { Sider } = Layout;
const { Title } = Typography;

const SiderComponent = ({ collapsed }) => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    Modal.confirm({
      title: "Confirm Sign Out",
      content: "Are you sure you want to sign out?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        dispatch({ type: SIGN_OUT });
      },
    });
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Title level={3} className="text-center pt-3">
        <span className="text-white">Logo</span>
      </Title>
      <Menu
        theme="dark"
        mode="inline"
        items={[
          {
            key: "1",
            icon: <BsDropbox />,
            label: (
              <NavLink end className="sidebar__link" to="/dashboard">
                Products
              </NavLink>
            ),
          },
          {
            key: "2",
            icon: <UsergroupAddOutlined />,
            label: (
              <NavLink className="sidebar__link" to="/dashboard/users">
                Users
              </NavLink>
            ),
          },
        ]}
      />
      <div className="p-[10px] flex-1 flex items-end ">
        <Button
          onClick={handleSignOut}
          className="w-full bottom-2"
          danger
          type="primary"
        >
          Sign Out
        </Button>
      </div>
    </Sider>
  );
};

export default SiderComponent;
