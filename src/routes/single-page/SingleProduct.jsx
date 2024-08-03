import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import Loading from "../../utils";
import { Card, Button } from 'antd';
const { Meta } = Card;

const SingleProduct = () => {
    const { id } = useParams(); // Correctly extract 'id' from URL parameters
    const [product, isLoading, error] = useFetch(`/product/single-product/${id}`); // Use the extracted 'id'
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <p>An error occurred: {error === 404 ? 'Product not found.' : 'Please try again later.'}</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ ...product, quantity });
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    return (
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card
                style={{ width: 600, margin: '20px auto', display: 'flex', flexDirection: 'row' }}
                cover={<img alt="product" src={product.product_images[0]} style={{ width: 300, height: 300, objectFit: 'cover' }} />}
            >
                <div style={{ padding: '20px' }}>
                    <Meta
                        title={product.product_name}
                        description={`$${product.sale_price}`}
                        style={{ marginBottom: '20px' }}
                    />
                    <p>{product.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                        <Button onClick={handleDecrement}>-</Button>
                        <span style={{ margin: '0 10px' }}>{quantity}</span>
                        <Button onClick={handleIncrement}>+</Button>
                    </div>
                    <Button onClick={handleAddToCart} type="primary">Add to Cart</Button>
                </div>
            </Card>
        </div>
    );
};

export default SingleProduct;
