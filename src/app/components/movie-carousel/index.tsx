/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import MovieCard from '@/app/components/movie-card';

export default function MovieCarousel({ movieDetails }: any) {
	console.log('movieDetails', movieDetails);

	return (
		<div className='bg-[#141414] min-h-screen p-8'>
			<div className='text-white mb-4'>
				<h2 className='text-xl font-medium'>Sản xuất tại Hàn Quốc</h2>
			</div>

			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2'>
				{movieDetails?.map((movie: any) => (
					<MovieCard key={movie?.id} {...movie} />
				))}
			</div>
		</div>
	);
}
