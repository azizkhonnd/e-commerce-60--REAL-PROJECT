import { useOutletContext } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { Table, Button, Popconfirm, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from '../../../api';
const { Column } = Table;

const Products = () => {
  const { termSearch = '' } = useOutletContext() || {};
  const [data, loading, setData] = useFetch('/product/all');

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/product/${id}`);
      if (response.status === 204) {
        setData(data.filter((product) => product._id !== id));
        notification.success({ message: 'Product deleted successfully' });
      }
    } catch (error) {
      notification.error({
        message: 'Error deleting product',
        description: error.message,
      });
    }
  };

  const filteredData = data?.filter((product) => {
    return (
      product.product_name.toLowerCase().includes(termSearch.toLowerCase()) ||
      product.category.toLowerCase().includes(termSearch.toLowerCase()) ||
      product.description.toLowerCase().includes(termSearch.toLowerCase())
    );
  });

  return (
    <Table loading={loading} dataSource={filteredData} rowKey="_id">
      <Column
        title="Image"
        dataIndex="product_images"
        key="product_images"
        render={(images) => (
          <img
            src={images[0]}
            alt="Product"
            style={{ width: 50, height: 50, objectFit: 'contain' }}
          />
        )}
      />
      <Column title="Name" dataIndex="product_name" key="product_name" />
      <Column
        title="Original Price"
        dataIndex="original_price"
        key="original_price"
        render={(price) => `$${price}`}
      />
      <Column
        title="Sale Price"
        dataIndex="sale_price"
        key="sale_price"
        render={(price) => `$${price}`}
      />
      <Column title="Category" dataIndex="category" key="category" />
      <Column title="In Stock" dataIndex="number_in_stock" key="number_in_stock" />
      <Column title="Product Type" dataIndex="product_type" key="product_type" />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Popconfirm
            title="Are you sure delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              danger
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        )}
      />
    </Table>
  );
};

export default Products;
