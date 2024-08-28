import { getChatGPTRecommendations } from '$lib/ai';
import { convertMoviesToCSV } from '$lib/csv';
import { scrapeLetterboxd } from '$lib/letterboxd';
import type { RecommendedMovie, WatchedMovie } from '$lib/types';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	// if (Math.random() < 0.5) {
	//   throw error(500, 'Random error occurred');
	// }

	const username = url.searchParams.get('username');
	const genre = url.searchParams.get('genres');

	if (!username) {
		throw error(400, 'Missing username parameter');
	}

	console.log(`Received request for user: ${username}, genre: ${genre}`);

	// const mockRecommendations: RecommendedMovie[] = Array.from({ length: 4 }, (_, i) => generateMovie(i + 1));

	const scrapedMovies: WatchedMovie[] = await scrapeLetterboxd(username);
	const watchedMovieData: string = convertMoviesToCSV(scrapedMovies);
	const recommendations: RecommendedMovie[] = await getChatGPTRecommendations(watchedMovieData, genre);

	return new Response(JSON.stringify(recommendations), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
