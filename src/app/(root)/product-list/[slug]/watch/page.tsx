'use client';

import { getMovies } from '@/api/movies/routes';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const Watch = () => {
	const searchParams = useSearchParams();
	const episode = searchParams.get('episode');
	const link = searchParams.get('link');

	const {
		data: moviesData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['movies', 1],
		queryFn: () => getMovies(1),
	});

	const items = moviesData?.items?.slice(0, 10);

	return (
		<div className='w-full sec-com bg-black text-white'>
			<div className='container'>
				<div className='w-full flex gap-5'>
					<iframe
						src={link || ''}
						title={`Episode ${episode}`}
						className='w-2/3 h-[30rem] border-none'
						allowFullScreen
					></iframe>
					<div className='flex flex-col gap-2'>
						{items?.map((movie: any) => (
							<div key={movie?.id}></div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Watch;
