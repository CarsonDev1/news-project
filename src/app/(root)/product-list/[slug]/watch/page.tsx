'use client';

import { useSearchParams } from 'next/navigation';

const Watch = () => {
	// Retrieve query parameters
	const searchParams = useSearchParams();
	const episode = searchParams.get('episode');
	const link = searchParams.get('link');

	return (
		<div className='w-full h-screen flex items-center justify-center bg-black text-white'>
			<div className='w-full h-full'>
				{/* Display video player */}
				<iframe
					src={link || ''}
					title={`Episode ${episode}`}
					className='w-full h-full border-none'
					allowFullScreen
				></iframe>
			</div>
		</div>
	);
};

export default Watch;
