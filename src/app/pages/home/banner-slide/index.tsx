import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaPlay, FaList, FaStar } from 'react-icons/fa';
import { getMovies } from '@/api/movies/routes';
import { getMovieSlug } from '@/api/movies/[slug]/route';

const BannerSlide = () => {
	const [itemActive, setItemActive] = useState<number>(0);
	const [page, setPage] = useState<number>(1);

	const {
		data: moviesData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['movies', page],
		queryFn: () => getMovies(page),
	});

	const items = moviesData?.items
		?.filter((item: any) => item.year)
		?.sort((a: any, b: any) => b.year - a.year)
		?.slice(0, 8);

	const countItem = items?.length;

	const next = () => {
		setItemActive((prev) => (prev + 1) % countItem);
	};

	const prev = () => {
		setItemActive((prev) => (prev - 1 + countItem) % countItem);
	};

	const showSlider = (index: number) => {
		setItemActive(index);
	};

	const {
		data: movieDetails,
		isLoading: movieLoading,
		isError: movieError,
	} = useQuery({
		queryKey: ['movieDetails', items?.[itemActive]?.slug],
		queryFn: () => getMovieSlug(items?.[itemActive]?.slug),
		enabled: !!items?.[itemActive]?.slug,
	});

	useEffect(() => {
		if (moviesData) {
			const interval = setInterval(() => {
				next();
			}, 5000);

			return () => clearInterval(interval);
		}
	}, [itemActive, moviesData]);

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-96 w-full bg-black'>
				<Image src='/loading.gif' width={200} height={200} alt='loading' className='object-contain' />
			</div>
		);
	}

	if (isError || movieError) {
		return <div>Error fetching movie details</div>;
	}

	return (
		<div>
			<div className='bg-black text-white'>
				{/* Slider */}
				<div className='relative h-dvh'>
					{/* List of items */}
					<div className='absolute inset-0'>
						{items?.map((item: any, index: any) => (
							<div
								key={index}
								className={`absolute inset-0 transition-opacity duration-500 ${
									index === itemActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
								}`}
							>
								<Image
									src={`https://img.ophim.live/uploads/movies/${item.poster_url}`}
									alt={`Slide ${index + 1}`}
									className='w-full h-full object-cover'
									fill
									quality={100}
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black to-transparent' />
								<div className='absolute top-1/4 left-28 z-10 text-left space-y-4'>
									<span className='px-3 py-1 text-xl bg-red-600 rounded-md'>
										{movieDetails?.movie?.episode_total?.replace('Tập', '')} Tập
									</span>
									<h2 className='text-3xl md:text-5xl font-bold leading-3'>
										{item.name} {item.tmdb.season && <span>(Season {item.tmdb.season})</span>}
									</h2>
									<p
										className='w-[70rem] line-clamp-4'
										dangerouslySetInnerHTML={{ __html: movieDetails?.movie?.content }}
									/>
									{item.tmdb.vote_average > 0 && (
										<p className='flex items-center space-x-1'>
											<FaStar key={index} className='text-yellow-500' />
											<span className='text-xl'>{item.tmdb.vote_average}</span>
										</p>
									)}

									<div className='flex space-x-4 mt-4'>
										<button className='flex gap-3 items-center bg-white text-black font-bold py-3 px-6 rounded'>
											<FaPlay />
											<span>Play</span>
										</button>
										<button className='flex gap-3 items-center bg-white/20 text-white font-bold py-3 px-6 rounded'>
											<FaList /> My List
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Arrow Buttons */}
					<div className='absolute top-1/4 right-28 z-20 flex space-x-4'>
						<button
							onClick={prev}
							className='w-10 h-10 bg-gray-500 hover:bg-gray-300 text-white font-bold rounded-lg'
						>
							{'<'}
						</button>
						<button
							onClick={next}
							className='w-10 h-10 bg-gray-500 hover:bg-gray-300 text-white font-bold rounded-lg'
						>
							{'>'}
						</button>
					</div>

					{/* Thumbnail */}
					<div className='absolute bottom-28 w-full flex justify-center space-x-4 overflow-auto px-8 z-10'>
						{items?.map((item: any, index: any) => (
							<div
								key={index}
								onClick={() => showSlider(index)}
								className={`cursor-pointer flex-shrink-0 w-48 h-56 relative transition-all duration-500 ${
									index === itemActive ? 'brightness-150' : 'brightness-50'
								}`}
							>
								<span className='absolute top-1 left-1 px-2 py-1 text-sm bg-red-600 text-white rounded-md'>
									Nổi bật
								</span>
								<Image
									src={`https://img.ophim.live/uploads/movies/${item.thumb_url}`}
									alt={`Thumbnail ${index + 1}`}
									className='w-full h-full object-cover rounded-lg'
									width={900}
									height={900}
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
