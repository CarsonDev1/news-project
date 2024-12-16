'use client';
import { getMovieSlug } from '@/api/movies/[slug]/route';
import { getMovies } from '@/api/movies/routes';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import Link from 'next/link';

const SeriesList = () => {
	const [page, setPage] = useState<number>(1);

	const {
		data: moviesData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['moviesSeries', page],
		queryFn: () => getMovies(page),
	});

	const movieSlugs = moviesData?.items.map((movie: any) => movie.slug) || [];

	const { data: movieDetails } = useQuery({
		queryKey: ['movieDetails', movieSlugs],
		queryFn: async () => {
			const movieDetailsPromises = movieSlugs.map((slug: any) => getMovieSlug(slug));
			return Promise.all(movieDetailsPromises);
		},
		enabled: movieSlugs.length > 0,
	});

	const totalPages = moviesData?.pagination?.totalPages;

	const mostMovies = movieDetails
		?.filter((item: any) => item?.movie?.type === 'series')
		.sort((a: any, b: any) => b.movie.year - a.movie.year)
		.slice(0, 10);

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setPage(newPage);
		}
	};

	const getPaginationItems = () => {
		const pages = [];
		const maxPagesToShow = 5;
		let startPage = Math.max(1, page - 2);
		let endPage = Math.min(totalPages, page + 2);

		if (startPage === 1) endPage = Math.min(totalPages, maxPagesToShow);
		if (endPage === totalPages) startPage = Math.max(1, totalPages - maxPagesToShow);

		if (startPage > 1) pages.push(1);
		if (startPage > 2) pages.push('...');

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		if (endPage < totalPages - 1) pages.push('...');
		if (endPage < totalPages) pages.push(totalPages);

		return pages;
	};

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-dvh bg-black'>
				<div className='animate-spin border-t-4 border-red-500 border-solid w-16 h-16 rounded-full'></div>
			</div>
		);
	}
	return (
		<div className='bg-black'>
			<div className='container'>
				<section className='sec-com'>
					<h2 className='text-3xl font-bold mb-6 text-white border-b-2 border-red-600 pb-2'>
						Phim bộ hay nhất
					</h2>

					{/* Movie Grid for XL screens */}
					<div className='hidden xl:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
						{mostMovies?.map((movie: any) => (
							<MovieCard key={movie.movie?._id} movie={movie.movie} />
						))}
					</div>

					{/* Swiper for smaller screens */}
					<div className='flex xl:hidden'>
						<Swiper
							spaceBetween={16}
							slidesPerView={2}
							breakpoints={{
								640: { slidesPerView: 1 },
								768: { slidesPerView: 3 },
								1024: { slidesPerView: 4 },
							}}
						>
							{mostMovies?.map((movie: any) => (
								<SwiperSlide key={movie.movie?._id}>
									<MovieCard movie={movie.movie} />
								</SwiperSlide>
							))}
						</Swiper>
					</div>

					{/* Pagination Controls */}
					<div className='flex justify-center mt-4'>
						{/* Prev button */}
						<button
							onClick={() => handlePageChange(page - 1)}
							disabled={page === 1}
							className='px-4 py-2 bg-gray-800 text-white rounded-md mx-2'
						>
							Prev
						</button>

						{/* Page numbers */}
						{getPaginationItems().map((pageNumber, index) => (
							<button
								key={index}
								onClick={() => {
									if (pageNumber !== '...') {
										handlePageChange(pageNumber as number);
									}
								}}
								className={`px-4 py-2 text-white rounded-md mx-1 ${
									page === pageNumber ? 'bg-red-600' : 'bg-gray-800'
								} ${pageNumber === '...' ? 'cursor-default' : ''}`}
								disabled={pageNumber === '...'}
							>
								{pageNumber}
							</button>
						))}

						{/* Next button */}
						<button
							onClick={() => handlePageChange(page + 1)}
							disabled={page === totalPages}
							className='px-4 py-2 bg-gray-800 text-white rounded-md mx-2'
						>
							Next
						</button>
					</div>
				</section>
			</div>
		</div>
	);
};

const MovieCard: React.FC<{ movie: any }> = ({ movie }) => (
	<Link
		href={`/product-list/${movie?.slug}`}
		className='border border-slate-800 rounded-lg text-center shadow-md hover:shadow-lg transition duration-300 transform hover:border-red-500 group flex flex-col justify-between relative h-56 overflow-hidden'
	>
		<span className='px-2 py-1 text-white text-xs sm:text-sm md:text-base bg-red-600 rounded-sm w-fit relative z-10'>
			{movie?.episode_total > 0 ? `${movie?.episode_total.replace('Tập', '')} Tập` : 'Đang cập nhật'}
		</span>

		{/* Overlay on hover */}
		<div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center z-10 rounded-lg'>
			<button className='cursor-pointer'>
				<div className='w-[83px] h-[83px] bg-red-50 rounded-full relative shadow-[inset_0px_0px_1px_1px_rgba(0,0,0,0.3),_2px_3px_5px_rgba(0,0,0,0.1)] flex items-center justify-center'>
					<div className='absolute w-[72px] h-[72px] z-10 bg-black rounded-full left-1/2 -translate-x-1/2 top-[5px] blur-[1px]' />
					<label className='group cursor-pointer absolute w-[72px] h-[72px] bg-gradient-to-b from-red-600 to-red-400 rounded-full left-1/2 -translate-x-1/2 top-[5px] shadow-[inset_0px_4px_2px_#60a5fa,inset_0px_-4px_0px_#1e3a8a,0px_0px_2px_rgba(0,0,0,10)] active:shadow-[inset_0px_4px_2px_rgba(96,165,250,0.5),inset_0px_-4px_2px_rgba(37,99,235,0.5),0px_0px_2px_rgba(0,0,0,10)] z-20 flex items-center justify-center'>
						<div className='w-8 group-active:w-[31px] fill-red-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.5)]'>
							<svg xmlns='http://www.w3.org/2000/svg' id='Filled' viewBox='0 0 24 24'>
								<path d='M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z' />
							</svg>
						</div>
					</label>
				</div>
			</button>
		</div>

		{/* Movie Image */}
		<Image
			src={movie?.poster_url}
			width={500}
			height={500}
			alt='movie image'
			className='rounded-lg object-cover absolute w-full h-full transform transition-transform duration-300 group-hover:scale-105'
		/>

		{/* Movie Title and Description */}
		<div className='p-3 absolute bottom-0 left-0 bg-black/40 w-full'>
			<span className='text-lg font-semibold text-white flex items-center justify-center'>
				<span className='mr-2'>{movie?.name}</span>
			</span>
		</div>
	</Link>
);

export default SeriesList;
