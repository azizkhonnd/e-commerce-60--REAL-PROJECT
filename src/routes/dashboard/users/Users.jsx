import { Table, Button, notification } from "antd";
import useFetch from '../../../hooks/useFetch'
import axios from "../../../api";

const Users = () => {

  const [data, isLoading] = useFetch('/admin/registered-users')

  const columns = [
    {
      title: 'Firstname',
      dataIndex: 'first_name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Date',
      dataIndex: 'registeredAt',
    },
    {
      title: 'Action',
      render: (user) => <Button onClick={() => handlePromoteUser(user)} type="primary">Promote</Button>
    }
  ];

  const handlePromoteUser = async (user) => {
    try {
      const response = await axios.post("/admin/add-admin", { username: user.username })
      if (response.status === 200) {
        notification.success({
          message: "Success promoted"
        })
      }
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <Table loading={isLoading} rowKey={(row) => row._id} columns={columns} dataSource={data} />
  )
}

export default Users