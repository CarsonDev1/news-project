'use client'
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Banner from './banner';
import Categories from './categories';
import NewsFeed from './news-feed';

const HomePage = () => {



    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <main className="container mx-auto mt-6 px-4">
                {/* Main News Carousel */}
                <Banner />


                {/* Categories */}
                <Categories />

                {/* Latest News */}
                <NewsFeed />

            </main>


        </div>
    );
};

export default HomePage;
