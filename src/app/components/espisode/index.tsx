'use client';

import { Search } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function EpisodeSelector({ moviesData }: any) {
	const dataEpisodes = moviesData?.episodes?.[0];

	const episodes = Array.from({ length: 12 }, (_, i) => i + 1);
	const activeEpisode = 4;

	return (
		<div className='sec-com'>
			<div className='container mx-auto space-y-4'>
				<Accordion type='single' collapsible className='!border-none'>
					<AccordionItem value='item-1' className='!border-none'>
						<AccordionTrigger>
							{/* Header */}
							<div className='flex items-center gap-2 text-white mb-4'>
								<svg viewBox='0 0 24 24' className='w-5 h-5' fill='currentColor'>
									<path d='M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z' />
								</svg>
								<span className='font-medium'>Danh sách tập</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className='!border-none'>
							{/* Controls */}
							<div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
								{/* Custom Select */}
								<div className='relative w-full sm:w-[300px]'>
									<select
										className='w-full appearance-none bg-[#1A1F2E] border border-[#2A3041] rounded px-4 py-2 text-white pr-10 focus:outline-none'
										defaultValue='hanoi'
									>
										<option value='hanoi'>{dataEpisodes?.server_name}</option>
									</select>
									<div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
										<svg
											className='w-4 h-4 text-white'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M19 9l-7 7-7-7'
											/>
										</svg>
									</div>
								</div>

								{/* Search Input */}
								<div className='relative w-full sm:w-[300px]'>
									<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
									<input
										type='text'
										placeholder='Tìm tập phim'
										className='w-full bg-[#1A1F2E] border border-[#2A3041] rounded pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none'
									/>
								</div>
							</div>

							{/* Episodes List */}
							<div className='grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-2 mt-4'>
								{dataEpisodes?.server_data?.map((ep: any) => (
									<button
										key={ep}
										className={`
                w-full aspect-[3/1] flex items-center justify-center rounded ${
					ep === activeEpisode
						? 'bg-[#2A3041] text-white'
						: 'bg-gradient-to-b from-[#1A1F2E] to-[#1A1F2E] text-gray-300 hover:text-white'
				}
                border border-[#2A3041]
                transition-colors duration-200 text-sm
              `}
									>
										Tập {ep?.name?.toString().padStart(2, '0')}
									</button>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}
