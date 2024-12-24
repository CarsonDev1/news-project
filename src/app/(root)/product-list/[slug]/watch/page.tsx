'use client';

import { useSearchParams } from 'next/navigation';

const Watch = () => {
	const searchParams = useSearchParams();
	const episode = searchParams.get('episode');
	const link = searchParams.get('link');

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
					<div className=''>List Movie</div>
				</div>
			</div>
		</div>
	);
};

export default Watch;
