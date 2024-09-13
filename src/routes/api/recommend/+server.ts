import { getChatGPTRecommendations } from '$lib/ai';
import type { RecommendedFilm } from '$lib/types';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import {
	fetchLetterboxdFilms,
	fetchLetterboxdDiary,
	fetchLetterboxdReviews,
	addTmdbPosterUrls
} from 'betterboxd';
import type { Film } from 'betterboxd/dist/src/types';

export const GET: RequestHandler = async ({ url }) => {
	// NOTE: test code; TODO(michaelfromyeg): find a more legit home for this
	//
	// if (Math.random() < 0.5) {
	//   throw error(500, 'Random error occurred');
	// }
	//
  // if (process.env.NODE_ENV === "development") {
  //   return new Response(JSON.stringify(RECOMMENDATIONS), {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  // }

	const username = url.searchParams.get('username');
	const genre = url.searchParams.get('genre');
	const source = url.searchParams.get('source');

	if (!username) {
		throw error(400, 'Missing username parameter');
	}
	if (!source || !['Diary', 'Reviews'].includes(source)) {
		throw error(400, 'Missing source parameter or invalid source');
	}

	console.log(`Received request for user: ${username}, genre: ${genre}, source: ${source}`);

	console.log("Fetching all user's seen films from Letterboxd");
	const { films: seenFilms } = await fetchLetterboxdFilms(username);

	console.log(`Successfully got seen films; now getting reviewed films from ${source}`);
	let reviewedFilms: Film[] = [];
	if (source === 'Diary') {
		const diary = await fetchLetterboxdDiary(username);
		reviewedFilms = diary.films;
	} else {
		const reviews = await fetchLetterboxdReviews(username);
		reviewedFilms = reviews.films;
	}

  console.log('Successfully got reviewed films; now getting recommendations');
	const recommendedFilms: RecommendedFilm[] = await getChatGPTRecommendations(
		seenFilms,
		reviewedFilms,
    [],
		genre
	);
	await addTmdbPosterUrls(recommendedFilms);

	console.log('Returning recommendations', recommendedFilms);
	return new Response(JSON.stringify(recommendedFilms), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
