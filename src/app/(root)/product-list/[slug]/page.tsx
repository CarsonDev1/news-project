/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { getMovieSlug } from '@/api/movies/[slug]/route';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

interface Params {
	slug: string;
}

const ProductDetail = () => {
	const params = useParams() as unknown as Params;
	const { slug } = params;

	const {
		data: moviesData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['moviesDetail', slug],
		queryFn: () => getMovieSlug(slug),
	});

	return (
		<div className='bg-black sec-com'>
			<div className='container'>
				<div className='w-full h-[600px] relative'>
					<Image
						src={moviesData?.movie?.poster_url}
						alt='thumb_movie'
						width={1820}
						height={1200}
						className='object-cover w-full h-full'
					/>
					<div className='absolute w-full h-full inset-0 bg-black/50 bg-opacity-25'></div>
					<button className='cursor-pointer absolute left-1/2 top-[45%] -translate-x-1/2'>
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
					<div className='absolute left-1 bottom-3 w-full flex items-center gap-12'>
						<Image
							src={moviesData?.movie?.poster_url}
							alt='thumb_movie'
							width={500}
							height={500}
							className='object-cover w-1/4 h-56 border'
						/>
						<div className='flex flex-col gap-3 text-white'>
							<h2 className='text-5xl'>{moviesData?.movie?.name}</h2>
							<p>{moviesData?.movie?.content}</p>
							<span>{moviesData?.movie?.origin_name}</span>
							<Button className='w-fit'>Xem Phim</Button>
						</div>
					</div>
				</div>
				<div className='bg-slate-800'></div>
			</div>
		</div>
	);
};

export default ProductDetail;
