/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function MovieCard({ movie }: any) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className='group/item relative h-[200px]'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Base Card */}
			<div className={`w-full h-full transition-opacity duration-200 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
				<img src={movie?.poster_url} alt={movie?.name} className='w-full h-full object-cover rounded' />
			</div>

			{/* Hover Card */}
			<div
				className={`absolute top-[-50%] left-[-20%] right-[-20%] h-[300px] z-50 bg-[#181818] rounded-md shadow-xl transition-all duration-200 
          ${isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
			>
				{/* Preview Image */}
				<div className='relative w-full h-[169px]'>
					<img
						src={movie?.poster_url}
						alt={movie?.name}
						className='w-full h-full object-cover rounded-t-md'
					/>
					<div className='absolute inset-0 bg-black/10' />
				</div>

				{/* Content */}
				<div className='p-4'>
					{/* Controls */}
					<div className='flex items-center gap-2 mb-4'>
						<button className='flex items-center justify-center w-8 h-8 bg-white rounded-full hover:bg-white/80'>
							<Play className='w-4 h-4 text-black fill-black ml-1' />
						</button>
						<button className='flex items-center justify-center w-8 h-8 border-2 border-white/40 rounded-full hover:border-white'>
							<Plus className='w-4 h-4 text-white' />
						</button>
						<button className='flex items-center justify-center w-8 h-8 border-2 border-white/40 rounded-full hover:border-white'>
							<ThumbsUp className='w-4 h-4 text-white' />
						</button>
						<button className='flex items-center justify-center w-8 h-8 border-2 border-white/40 rounded-full hover:border-white ml-auto'>
							<ChevronDown className='w-4 h-4 text-white' />
						</button>
					</div>

					{/* Metadata */}
					{/* <div className='flex items-center gap-2 text-xs text-white mb-2'>
						<span className='px-1.5 py-0.5 border border-white/40 rounded'>{episode}</span>
						<span className='px-1.5 py-0.5 border border-white/40 rounded'>{quality}</span>
					</div> */}

					{/* Genres */}
					{/* <div className='flex items-center gap-1.5 text-xs text-white/50'>
						{genres.map((genre, index) => (
							<>
								<span key={genre}>{genre}</span>
								{index < genres.length - 1 && <span>•</span>}
							</>
						))}
					</div> */}
				</div>
			</div>
		</div>
	);
}
