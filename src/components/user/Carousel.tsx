import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from '../../assets/banner1.avif'
import banner2 from '../../assets/banner2.jpg'
import banner3 from '../../assets/banner3.jpg'
import banner4 from '../../assets/banner4.jpeg'
import banner5 from '../../assets/banner5.jpg'
import { Link } from 'react-router-dom';


const Carousel = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };
  
    return (
      <div
        id="default-carousel"
        className="relative w-full md:h-auto lg:h-auto overflow-x-hidden overflow-y-hidden"
        data-carousel="slide"
      >
        <Slider {...settings}>
          <div className="duration-700 ease-in-out" data-carousel-item>
            <div className="w-full h-[250px] md:h-full lg:h-full relative">
              <img
                src={banner1}
                className="w-full h-[250px] md:h-full lg:h-full"
                alt="banner1"
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                <p
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "24px",
                    letterSpacing: "1px",
                    marginBottom: "10px",
                  }}
                >
                  Start your journey with us...
                </p>
                <Link to='/property'>
                  <button
                    style={{
                      backgroundColor: "#007FFF",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      letterSpacing: "1px",
                      padding: "10px 15px",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="duration-700 ease-in-out" data-carousel-item>
            <div className="w-full h-auto md:h-full lg:h-full relative">
              <img
                src={banner2}
                className="w-full h-[250px] md:h-full lg:h-full"
                alt="banner1"
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                <p
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "24px",
                    letterSpacing: "1px",
                    marginBottom: "10px",
                  }}
                >
                  Start your journey with us...
                </p>
                <Link to='/property'>
                  <button
                    style={{
                      backgroundColor: "#007FFF",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      letterSpacing: "1px",
                      padding: "10px 15px",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="duration-700 ease-in-out" data-carousel-item>
            <div className="w-full h-auto md:h-full lg:h-full relative">
              <img
                src={banner3}
                className="w-full h-[250px] md:h-full lg:h-full"
                alt="banner1"
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                <p
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "24px",
                    letterSpacing: "1px",
                    marginBottom: "10px",
                  }}
                >
                  Start your journey with us...
                </p>
                <Link to='/property'>
                  <button
                    style={{
                      backgroundColor: "#007FFF",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      letterSpacing: "1px",
                      padding: "10px 15px",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="duration-700 ease-in-out" data-carousel-item>
            <div className="w-full h-auto md:h-full lg:h-full relative">
              <img
                src={banner4}
                className="w-full h-[250px] md:h-full lg:h-full"
                alt="banner1"
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                <p
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "24px",
                    letterSpacing: "1px",
                    marginBottom: "10px",
                  }}
                >
                  Start your journey with us...
                </p>
                <Link to='/property'>
                  <button
                    style={{
                      backgroundColor: "#007FFF",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      letterSpacing: "1px",
                      padding: "10px 15px",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="duration-700 ease-in-out" data-carousel-item>
            <div className="w-full h-auto md:h-full lg:h-full relative">
              <img
                src={banner5}
                className="w-full h-[250px] md:h-full lg:h-full"
                alt="banner1"
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                <p
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "24px",
                    letterSpacing: "1px",
                    marginBottom: "10px",
                  }}
                >
                  Start your journey with us...
                </p>
                <Link to='/property'>
                  <button
                    style={{
                      backgroundColor: "#007FFF",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      letterSpacing: "1px",
                      padding: "10px 15px",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Slider>
      </div>
  )
}

export default Carousel