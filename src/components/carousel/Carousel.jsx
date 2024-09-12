import { Carousel } from "antd"
import CarouselImg2 from './img/carousel-2.webp'
import './carousel.css'
const CarouselComponent = () => {
    return (
        <div className="container carousel__items ">
            <Carousel autoplay className="mt-8">

                <div>
                    <img className="carousel__img" src={CarouselImg2} alt="Site Logo" />
                </div>
            </Carousel>
        </div>
    )
}

export default CarouselComponent