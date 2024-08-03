import { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartData);
    }, []);

    const handleRemove = (id) => {
        const updatedCart = cart.filter(item => item._id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleIncrement = (id) => {
        const updatedCart = cart.map(item =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleDecrement = (id) => {
        const updatedCart = cart.map(item =>
            item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.sale_price * item.quantity), 0).toFixed(2);
    };

    const getTotalQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product_name',
            key: 'product_name',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        alt={record.product_name}
                        src={record.product_images[0]}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                    />
                    {text}
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'sale_price',
            key: 'sale_price',
            render: (text) => `$${text.toFixed(2)}`,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button onClick={() => handleDecrement(record._id)}>-</Button>
                    <span style={{ margin: '0 10px' }}>{text}</span>
                    <Button onClick={() => handleIncrement(record._id)}>+</Button>
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="danger" onClick={() => handleRemove(record._id)}>Remove</Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Table
                dataSource={cart}
                columns={columns}
                rowKey="_id"
                pagination={false}
            />
            {cart.length > 0 && (
                <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '380px', margin: '20px auto' }}>
                    <h2>Total Price: ${getTotalPrice()}</h2>
                    <p>Total Items: {getTotalQuantity()}</p>
                    <Button
                        type="primary"
                        onClick={() => navigate('/')}
                        style={{ width: '100%' }}
                    >
                        Checkout
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
