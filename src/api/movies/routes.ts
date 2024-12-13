import axios from 'axios';

export const getMovies = async (page: number): Promise<any> => {
	try {
		const response = await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat`, {
			params: { page },
		});
		return response.data;
	} catch (error: any) {
		console.error('Error fetching movies:', error.response?.data || error.message);
		throw error;
	}
};