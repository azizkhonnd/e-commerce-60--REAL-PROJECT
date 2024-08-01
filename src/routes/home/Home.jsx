import { useEffect, useState } from "react";
import { Table, Spin, notification } from "antd";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        notification.error({
          message: "Error fetching products",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img alt="product" src={image} style={{ width: 50, height: 50 }} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Most Popular Products</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={products}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default Home;
