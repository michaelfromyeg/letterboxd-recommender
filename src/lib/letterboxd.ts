import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import type { WatchedMovie } from './types';

interface CacheData {
	movies: WatchedMovie[];
	lastUpdated: number;
}

const IN_MEMORY_CACHE: Record<string, CacheData> = {};

const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function getCachedData(username: string): CacheData | null {
  return IN_MEMORY_CACHE[username] || null;
}

function setCachedData(username: string, data: CacheData): void {
  IN_MEMORY_CACHE[username] = data;
}

const MONTH_MAPPING: Record<string, string> = {
	Jan: 'January',
	Feb: 'February',
	Mar: 'March',
	Apr: 'April',
	May: 'May',
	Jun: 'June',
	Jul: 'July',
	Aug: 'August',
	Sep: 'September',
	Oct: 'October',
	Nov: 'November',
	Dec: 'December'
};

interface PageResult {
	movies: WatchedMovie[];
	prevYear: string;
	totalPages: number;
}

async function scrapeLetterboxdPage(url: string, prevYear: string = ''): Promise<PageResult> {
	console.log('Fetching', url);
	const response = await fetch(url);
	const html = await response.text();
	const $ = cheerio.load(html);

	const movies: WatchedMovie[] = [];
	let currentPrevYear = prevYear;

	$('tr.diary-entry-row').each((index, element) => {
		const $element = $(element);
		const hideForOwner = $element.find('div.hide-for-owner');
		if (hideForOwner.length === 0) return;

		const ratingStarString = hideForOwner.text().trim();
		const rating = ratingStarString.length + (ratingStarString.endsWith('½') ? 0.5 - 1 : 0);

		const tdActions = $element.find('td.td-actions');
		const title = tdActions.attr('data-film-name');
		if (!title) return;

		let year = '';
		const dateElement = $element.find('div.date');
		if (dateElement.length > 0) {
			const monthStr = dateElement.text().trim().split(' ')[0];
			const yearStr = $element.find('td.td-calendar small').text().trim();
			year = `${MONTH_MAPPING[monthStr]} ${yearStr}`;
			currentPrevYear = year;
		} else {
			year = currentPrevYear;
		}

		const slug = tdActions.attr('data-film-slug');
		const movieUrl = `https://letterboxd.com/film/${slug}/`;

		movies.push({
			title,
			rating,
			year,
			movieUrl
		});
	});

	// get total number of pages of user's reviews we could scrape
	let totalPages = 1;
	const paginatePages = $('.paginate-pages');
	if (paginatePages.length > 0) {
		const lastPageLink = paginatePages.find('li:last-child a');
		if (lastPageLink.length > 0) {
			totalPages = parseInt(lastPageLink.text().trim(), 10);
		}
	}

	return { movies, prevYear: currentPrevYear, totalPages };
}

export async function scrapeLetterboxd(
	username: string,
	maxPages: number = 5
): Promise<WatchedMovie[]> {
	const cachedData = getCachedData(username);
	if (cachedData && Date.now() - cachedData.lastUpdated < CACHE_EXPIRATION) {
		console.log(`Using cached data for ${username}`);
		return cachedData.movies;
	}

	let allMovies: WatchedMovie[] = [];
	let prevYear = '';

	const firstPageUrl = `https://letterboxd.com/${username}/films/diary/`;
	const {
		movies: firstPageMovies,
		prevYear: firstPagePrevYear,
		totalPages
	} = await scrapeLetterboxdPage(firstPageUrl);

	allMovies = allMovies.concat(firstPageMovies);
	prevYear = firstPagePrevYear;

	const pagesToScrape = Math.min(totalPages, maxPages);

	for (let pageNum = 2; pageNum <= pagesToScrape; pageNum++) {
		const url = `https://letterboxd.com/${username}/films/diary/page/${pageNum}/`;
		const { movies, prevYear: currentPrevYear } = await scrapeLetterboxdPage(url, prevYear);

		allMovies = allMovies.concat(movies);
		prevYear = currentPrevYear;

		// add a delay to avoid rate limiting
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}

	setCachedData(username, { movies: allMovies, lastUpdated: Date.now() });

	return allMovies;
}
