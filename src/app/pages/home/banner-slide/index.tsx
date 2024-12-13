/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaPlay, FaList, FaStar } from 'react-icons/fa';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

const BannerSlide = ({ moviesData, movieDetails }: any) => {
	const [itemActive, setItemActive] = useState<number>(0);

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

	useEffect(() => {
		if (moviesData) {
			const interval = setInterval(() => {
				next();
			}, 5000);

			return () => clearInterval(interval);
		}
	}, [itemActive, moviesData]);

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
								<div className='absolute top-1/4 left-10 sm:left-20 md:left-28 lg:left-32 z-10 text-left flex flex-col justify-between h-72'>
									<span className='px-3 py-1 text-xl bg-red-600 rounded-md w-fit'>
										{movieDetails?.movie?.episode_total?.replace('Tập', '')} Tập
									</span>
									<h2 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-3'>
										{item.name} {item.tmdb.season && <span>(Season {item.tmdb.season})</span>}
									</h2>
									<p
										className='w-full line-clamp-3'
										dangerouslySetInnerHTML={{ __html: movieDetails?.movie?.content }}
									/>
									{item.tmdb.vote_average > 0 && (
										<p className='flex items-center space-x-1'>
											<FaStar key={index} className='text-yellow-500' />
											<span className='text-xl'>{item.tmdb.vote_average}</span>
										</p>
									)}

									<div className='flex space-x-4 mt-4'>
										<Link href={`/product-list/${item.slug}`} passHref>
											<button className='flex gap-3 items-center bg-white text-black font-bold py-3 px-6 rounded'>
												<FaPlay />
												<span>Play</span>
											</button>
										</Link>
										<button className='flex gap-3 items-center bg-white/20 text-white font-bold py-3 px-6 rounded'>
											<FaList /> My List
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Arrow Buttons */}
					<div className='absolute top-1/4 right-10 sm:right-14 md:right-20 lg:right-28 z-20 flex space-x-4'>
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
					<div className='absolute bottom-28 w-full flex justify-center px-8 z-10'>
						<div className='hidden lg:block'>
							<div className='flex justify-center space-x-4 overflow-auto'>
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

						<div className='lg:hidden'>
							<Swiper
								spaceBetween={10}
								slidesPerView='auto'
								loop={true}
								centeredSlides={true}
								className='w-full'
							>
								{items?.map((item: any, index: any) => (
									<SwiperSlide key={index}>
										<div
											onClick={() => showSlider(index)}
											className={`cursor-pointer relative transition-all duration-500 ${
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
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BannerSlide;
