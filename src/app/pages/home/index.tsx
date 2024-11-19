'use client';
import React from 'react';
import Categories from './categories';
import NewsFeed from './news-feed';
import BannerSlide from '@/app/pages/home/banner-slide';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const HomePage = () => {
	return (
		<div className='min-h-screen bg-gray-100 font-sans'>
			<BannerSlide />
			<main className='container mx-auto mt-6 px-4'>
				<Categories />

				<NewsFeed />
			</main>
		</div>
	);
};

export default HomePage;
