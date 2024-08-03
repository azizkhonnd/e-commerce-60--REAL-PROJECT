import { useContext } from "react";
import { Table, Button, notification } from "antd";
import axios from "../../../api";
import useFetch from "../../../hooks/useFetch";
import { SearchContext } from "../../dashboard/Dashboard";

const Users = () => {
  const searchQuery = useContext(SearchContext);
  const [data, isLoading] = useFetch('/admin/registered-users');

  const handlePromoteUser = async (user) => {
    try {
      const response = await axios.post("/admin/add-admin", { username: user.username });
      if (response.status === 200) {
        notification.success({ message: "User promoted successfully" });
      }
    } catch (error) {
      notification.error({
        message: "Error promoting user",
        description: error.message,
      });
    }
  };

  const filteredData = data?.filter((user) => {
    return (
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const columns = [
    {
      title: "Firstname",
      dataIndex: "first_name",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Date",
      dataIndex: "registeredAt",
    },
    {
      title: "Action",
      render: (user) => (
        <Button onClick={() => handlePromoteUser(user)} type="primary">
          Promote
        </Button>
      ),
    },
  ];

  return <Table loading={isLoading} rowKey={(row) => row._id} columns={columns} dataSource={filteredData} />;
};

export default Users;
