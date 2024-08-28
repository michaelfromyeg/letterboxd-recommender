import type { WatchedMovie } from './types';

export function convertMoviesToCSV(movies: WatchedMovie[]): string {
	const headers = ['Title', 'Rating', 'Year']; // 'MovieURL'

	const csvContent = [
		headers.join(','),
		...movies.map(
			(movie) =>
				`"${movie.title.replace(/"/g, '""')}",${movie.rating},"${movie.year}"` // ,"${movie.movieUrl}"
		)
	].join('\n');

	return csvContent;
}
