import { BsCart3 } from "react-icons/bs";
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import useFetch from "../../hooks/useFetch";
import Loading from "../../utils";
import { Card, Carousel, Button, notification, Spin } from 'antd';
import axios from '../../api';

const { Meta } = Card;

const Home = () => {
  const user = useSelector(state => state?.user);
  const [trigger, setTrigger] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [data, isLoading] = useFetch("/product/all", [trigger]);
  const carouselRef = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    if (trigger) {
      setTrigger(false);
    }
  }, [trigger]);

  const handlePrev = (index, e) => {
    e.stopPropagation();
    carouselRef.current[index].prev();
  };

  const handleNext = (index, e) => {
    e.stopPropagation();
    carouselRef.current[index].next();
  };

  const handleLikeAndDislike = async (product) => {
    try {
      setLoadingProductId(product._id);
      const isLiked = product.likedby.includes(user.username);
      const response = await axios.patch(`/product/${product._id}/${isLiked ? 'unlike' : 'like'}`);

      if (response.status === 202) {
        setTrigger(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item._id === product._id);
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    notification.success({
      message: 'Added to Cart',
      description: `${product.product_name} has been added to your cart.`,
      placement: 'topRight',
    });
  };

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      {(isLoading || loadingProductId) ? <Loading /> :
        <div className='max-w-[1280px] mx-auto my-20 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {data && data.map((product, index) => (
            <Card
              key={product._id}
              style={{
                width: 300,
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
                borderRadius: 10,
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={() => handleCardClick(product._id)}
              cover={
                <div className='carousel-container' style={{ position: 'relative' }}>
                  <Carousel infinite autoplay ref={(el) => (carouselRef.current[index] = el)} style={{ height: 320, width: 300 }}>
                    {product.product_images.map((image) => (
                      <img
                        key={image}
                        alt="Product Image"
                        src={image}
                        style={{ height: 320, width: 300, objectFit: 'cover' }}
                      />
                    ))}
                  </Carousel>
                  <Button
                    className='carousel-button prev-button focus:outline-none'
                    onClick={(e) => handlePrev(index, e)}
                  >
                    <BiChevronLeft size={25} style={{ marginLeft: '-8px' }} />
                  </Button>
                  <Button
                    className='carousel-button next-button focus:outline-none'
                    onClick={(e) => handleNext(index, e)}
                  >
                    <BiChevronRight size={25} style={{ marginLeft: '-8px' }} />
                  </Button>
                </div>
              }
            >
              <Button
                onClick={(e) => { e.stopPropagation(); handleLikeAndDislike(product); }}
                className="rounded-full py-6 p-3 absolute top-[10px] right-[10px] focus:outline-none text-red-500"
                disabled={loadingProductId === product._id}
              >
                {loadingProductId === product._id ? <Spin size="small" /> :
                  (product.likedby.includes(user.username) ? <AiFillHeart size={22} /> : <AiOutlineHeart size={22} />)
                }
              </Button>
              <Button
                onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                className="rounded-full py-6 p-3 absolute bottom-[20px] right-[10px] focus:outline-none"
              >
                <BsCart3 size={22} />
              </Button>
              <Meta
                style={{ width: '80%' }}
                title={product.product_name}
                description={"$" + product.sale_price}
              />
            </Card>
          ))}
        </div>
      }
    </div>
  );
};

export default Home;
