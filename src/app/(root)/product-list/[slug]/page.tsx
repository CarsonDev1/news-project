/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { getMovieSlug } from '@/api/movies/[slug]/route';
import EpisodeSelector from '@/app/components/espisode';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

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
						className='object-cover w-full h-full rounded-sm'
					/>
					<div className='absolute w-full h-full inset-0 bg-black/50 bg-opacity-25'></div>
					<Link href={`/product-list/${moviesData?.movie?.slug}/watch`}>
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
					</Link>
					<div className='absolute left-3 bottom-3 w-full flex items-center gap-12'>
						<Image
							src={moviesData?.movie?.poster_url}
							alt='thumb_movie'
							width={500}
							height={500}
							className='object-cover w-1/4 h-56 border rounded-sm'
						/>
						<div className='flex flex-col gap-3 text-white'>
							<h2 className='text-5xl'>{moviesData?.movie?.name}</h2>
							<p
								className='w-[90%] line-clamp-3 text-sm sm:text-base md:text-lg'
								dangerouslySetInnerHTML={{ __html: moviesData?.movie?.content }}
							/>
							<span>{moviesData?.movie?.origin_name}</span>
							<Link href={`/product-list/${moviesData?.movie?.slug}/watch`}>
								<Button className='w-fit'>Xem Phim</Button>
							</Link>
						</div>
					</div>
				</div>
				<EpisodeSelector moviesData={moviesData} />
				<div className='flex flex-col gap-1 text-white'>
					<h2 className='text-xl text-white mb-2'>Thông Tin Phim</h2>
					<div className='flex flex-col gap-3'>
						<p className='text-sm sm:text-base'>
							Ngày phát hành:{' '}
							{moviesData?.movie?.created?.time
								? format(new Date(moviesData.movie.created.time), 'dd/MM/yyyy', { locale: vi })
								: 'Đang cập nhật'}
						</p>
						<p className='text-sm sm:text-base'>
							Đạo diễn: {moviesData?.movie?.director?.[0] || 'Đang cập nhật'}
						</p>
						<p className='text-sm sm:text-base'>Thể loại: {moviesData?.movie?.category?.[0]?.name}</p>
						<div className='flex flex-col gap-2'>
							<span className='text-white'>Tóm tắt phim:</span>
							<p
								className='w-full text-sm sm:text-base'
								dangerouslySetInnerHTML={{ __html: moviesData?.movie?.content }}
							/>
						</div>
						<Link href={`/product-list/${moviesData?.movie?.slug}/watch`}>
							<Button className='w-fit'>Xem Phim</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
