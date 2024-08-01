/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Table, Button, Popconfirm, notification, Image } from "antd";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";

const Products = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const productsWithImages = response.data.map((product, index) => ({
        ...product,
        image: `https://picsum.photos/200?random=${index}`,
      }));
      setProducts(productsWithImages);
    } catch (error) {
      notification.error({
        message: "Error fetching products",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    notification.success({ message: "Product deleted successfully" });
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      render: (text, record) => <Image width={50} src={record.image} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure delete this product?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            icon={<DeleteOutlined />}
            className="text-red px-[9px] py-3.5"
            danger
            size="small"
          >
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={filteredProducts}
      loading={loading}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default Products;
