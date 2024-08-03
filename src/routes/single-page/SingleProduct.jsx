import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import Loading from "../../utils";
import { Card, Button, Carousel, notification } from 'antd';
const { Meta } = Card;

const SingleProduct = () => {
    const { id } = useParams();
    const [product, isLoading, error] = useFetch(`/product/single-product/${id}`);
    const [quantity, setQuantity] = useState(1);
    const [currentImage, setCurrentImage] = useState(0);
    const [activeThumbnail, setActiveThumbnail] = useState(null);
    const carouselRef = useRef(null);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const showNotification = () => {
        notification.success({
            message: 'Product Added to Cart',
            description: `${product.product_name} has been added to your cart.`,
            placement: 'topRight',
        });
    };

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
        const existingProductIndex = cart.findIndex(item => item._id === product._id);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        showNotification();
    };

    const handleThumbnailClick = (index) => {
        setCurrentImage(index);
        setActiveThumbnail(index);
        carouselRef.current.goTo(index);
    };

    return (
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', marginTop: '250px', height: "200px", justifyContent: 'center', marginLeft: '200px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '80%', maxWidth: 1200, height: '400px', gap: 10 }}>
                <ul style={{ display: 'flex', flexDirection: 'column', listStyle: 'none', padding: 0, marginTop: '-5px', gap: '20px' }}>
                    {product.product_images.map((image, index) => (
                        <li key={index} style={{ margin: '6.0px 5px', marginTop: '9.3px' }}>
                            <img
                                alt={`thumbnail-${index}`}
                                src={image}
                                style={{
                                    marginTop: '1px',
                                    width: '70px',
                                    height: '60px',
                                    cursor: 'pointer',
                                    backgroundColor: index === activeThumbnail ? '#C0C0C0' : 'transparent',
                                    transition: 'transform 0.3s ease',
                                    borderRadius: '5px',
                                }}
                                onClick={() => handleThumbnailClick(index)}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                        </li>
                    ))}
                </ul>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '50px', backgroundColor: '#C0C0C0', marginRight: '20px' }}>
                    <div style={{ flex: 1, overflowY: 'hidden' }}>
                        <Carousel
                            ref={carouselRef}
                            autoplay
                            vertical
                            infinite
                            dots={false}
                            style={{ height: '400px' }}
                            initialSlide={currentImage}
                        >
                            {product.product_images.map((image, index) => (
                                <div key={index} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img
                                        alt={`product-${index}`}
                                        src={image}
                                        style={{ height: '250px', width: 'auto', objectFit: 'contain', marginLeft: '5px', marginTop: '30px' }}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
                <div style={{ flex: 2, padding: '20px', marginTop: '20px' }}>
                    <Meta
                        title={product.product_name}
                        description={`$${product.sale_price}`}
                        style={{ marginBottom: '60px' }}
                    />
                    <p className='w-[65%]'>{product.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '30px 0' }}>
                        <Button onClick={handleDecrement}>-</Button>
                        <span style={{ margin: '0 10px' }}>{quantity}</span>
                        <Button onClick={handleIncrement}>+</Button>
                    </div>
                    <Button onClick={handleAddToCart} type="primary" className='w-80 mt-4'>Add to Cart</Button>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
