import React from "react";
import ImageSlider from "./HomePageImages.jsx"; // Adjust the import path as per your project structure
import charak1 from "./img/charak1.jpeg";
import charak2 from "./img/charak2.webp";
import charak3 from "./img/charak3.webp";
import charak4 from "./img/charak4.jpeg";
const ImgCol = () => {
  const images = [
    {
      url: charak1,
    },
    {
      url: charak2,
    },
    {
      url: charak3,
    },
    {
      url: charak4,
    },
    // Add more image URLs as needed
  ];

  return (
    <div>
      <ImageSlider images={images} />
    </div>
  );
};

export default ImgCol;
