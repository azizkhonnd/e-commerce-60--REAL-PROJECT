import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import Loading from "../../utils";
import { Card, Button } from 'antd';
const { Meta } = Card;

const SingleProduct = () => {
    const { id } = useParams();
    const [product, isLoading, error] = useFetch(`/single-product/${id}`);
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
        <div>
            <Card
                style={{ width: 300, margin: '20px auto' }}
                cover={<img alt="product" src={product.product_images[0]} />}
            >
                <Meta title={product.product_name} description={`$${product.sale_price}`} />
                <p>{product.description}</p>
                <div>
                    <Button onClick={handleDecrement}>-</Button>
                    <span>{quantity}</span>
                    <Button onClick={handleIncrement}>+</Button>
                </div>
                <Button onClick={handleAddToCart} type="primary">Add to Cart</Button>
            </Card>
        </div>
    );
};

export default SingleProduct;
