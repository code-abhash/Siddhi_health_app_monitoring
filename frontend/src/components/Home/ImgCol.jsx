import React from 'react';
import ImageSlider from './HomePageImages.jsx'// Adjust the import path as per your project structure
import  homeimg1  from './img/homeimg1.webp'; // Adjust the import path based on your project structure
import  homeimg2  from './img/homeimg2.jpeg'; // Adjust the import path based on your project structure

const ImgCol = () => {
  const images = [
    { url: homeimg1, caption: 'Pioneering healthcare at Charak: Innovating for better lives.' },
    { url: homeimg2, caption: 'Leading medical expertise at Charak: Transforming healthcare.' },
    // Add more image URLs as needed
  ];

  return (
    <div>
      <ImageSlider images={images} />
    </div>
  );
};

export default ImgCol;
