import type { RecommendedMovie } from './types';

const genres: string[] = [
	'Action',
	'Comedy',
	'Drama',
	'Sci-Fi',
	'Horror',
	'Romance',
	'Thriller',
	'Fantasy'
];

function getRandomGenre(): string {
	return genres[Math.floor(Math.random() * genres.length)];
}

export function generateMovie(index: number): RecommendedMovie {
	const title = `Movie ${index}`;
	const genre = getRandomGenre();
	return {
		title,
		// poster: `https://placehold.co/300x450/3498db/ffffff?text=${encodeURIComponent(title)}`,
		reason: `Top ${genre} movie based on your watch history`
	};
}
