import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const BannerSlide = () => {
  const [itemActive, setItemActive] = useState<number>(0);
  const items = [
    {
      img: '/img1.png',
      title: 'Slider 01',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.',
    },
    {
      img: '/img2.jpg',
      title: 'Slider 02',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.',
    },
    {
      img: '/img3.jpg',
      title: 'Slider 03',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.',
    },
    {
      img: '/img4.jpg',
      title: 'Slider 04',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.',
    },
    {
      img: '/img5.jpg',
      title: 'Slider 05',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.',
    },
  ];

  const countItem = items.length;

  const next = () => {
    setItemActive((prev) => (prev + 1) % countItem);
  };

  const prev = () => {
    setItemActive((prev) => (prev - 1 + countItem) % countItem);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [itemActive]);

  const showSlider = (index: number) => {
    setItemActive(index);
  };
  return (
    <div>
      <div className="bg-black text-white">
        {/* Slider */}
        <div className="relative h-screen">
          {/* List of items */}
          <div className="absolute inset-0">
            {items.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === itemActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={item.img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute top-1/4 left-10 z-10 text-left space-y-4">
                  <p className="uppercase tracking-widest">Design</p>
                  <h2 className="text-6xl md:text-8xl font-bold">
                    {item.title}
                  </h2>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow Buttons */}
          <div className="absolute top-1/4 right-10 z-20 flex space-x-4">
            <button
              onClick={prev}
              className="w-10 h-10 bg-gray-500 hover:bg-gray-300 text-white font-bold rounded-lg"
            >
              {'<'}
            </button>
            <button
              onClick={next}
              className="w-10 h-10 bg-gray-500 hover:bg-gray-300 text-white font-bold rounded-lg"
            >
              {'>'}
            </button>
          </div>

          {/* Thumbnail */}
          <div className="absolute bottom-12 w-full flex justify-center space-x-4 overflow-auto px-8 z-10">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => showSlider(index)}
                className={`cursor-pointer flex-shrink-0 w-36 h-56 relative transition-all duration-500 ${
                  index === itemActive ? 'brightness-150' : 'brightness-50'
                }`}
              >
                <Image
                  src={item.img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlide;
