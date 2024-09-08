import React, { useState, useEffect } from 'react';

const images = [
  "/images/s7.jpg",
  "/images/s2.jpg",
  
  "/images/s3.jpg",
  "/images/s4.jpg",
  "/images/s5.jpg",
  "/images/s6.jpg",
  

];

export function BannerPages() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3; // Show 3 images at a time

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerSlide >= images.length ? 0 : prevIndex + itemsPerSlide
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerSlide < 0 ? images.length - itemsPerSlide : prevIndex - itemsPerSlide
    );
  };

  // Auto slide every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-72">
      {/* Carousel container */}
      <div className="flex justify-center items-center w-full h-full overflow-hidden">
        {/* Images displayed 3 at a time */}
        <div className="flex w-full h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${(currentIndex * 100) / itemsPerSlide}%)` }}>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className="w-1/3 h-full object-cover"
            />
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full"
        onClick={prevSlide}
      >
        ◀
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full"
        onClick={nextSlide}
      >
        ▶
      </button>
    </div>
  );
}
