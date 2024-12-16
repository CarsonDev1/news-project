'use client';
import { getMovieSlug } from '@/api/movies/[slug]/route';
import { useQuery } from '@tanstack/react-query';
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

	return <div className='bg-black'>ProductDetail</div>;
};

export default ProductDetail;
