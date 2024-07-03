
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,          // Enable autoplay
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className="relative">
          <img
            src={image.url}
            alt={`Slide ${index}`}
            className="w-10/12 h-auto  mx-auto border-hidden rounded-md"
            style={{ maxHeight: "450px" }}
          />
          {/* <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <p className="text-white text-md font-bold bg-gray-500 bg-opacity-50 p-2 rounded-md">
              
            </p>
          </div> */}
        </div>

      ))}
    </Slider>
  );
};

export default ImageSlider;
