/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import Categories from './categories';
import NewsFeed from './news-feed';
import BannerSlide from '@/app/pages/home/banner-slide';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '@/api/movies/routes';
import { getMovieSlug } from '@/api/movies/[slug]/route';

const HomePage = () => {
	const [page, setPage] = useState<number>(1);
	const {
		data: moviesData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['movies', page],
		queryFn: () => getMovies(page),
	});
	const movieSlugs = moviesData?.items.map((movie: any) => movie.slug) || [];
	const {
		data: movieDetails,
		isLoading: isMovieLoading,
		isError: isMovieError,
	} = useQuery({
		queryKey: ['movieDetails', movieSlugs],
		queryFn: async () => {
			const movieDetailsPromises = movieSlugs.map((slug: any) => getMovieSlug(slug));
			return Promise.all(movieDetailsPromises);
		},
		enabled: movieSlugs.length > 0,
	});
	const loadMoreMovie = () => {
		setPage(page + 1);
	};

	return (
		<div className='min-h-screen bg-gray-100 font-sans'>
			<BannerSlide movieDetails={movieDetails} />
			<main className='container-lg'>
				<Categories />

				<NewsFeed />
			</main>
		</div>
	);
};

export default HomePage;
