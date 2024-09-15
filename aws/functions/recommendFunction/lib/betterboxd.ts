import * as cheerio from "cheerio";
import fetch from "node-fetch";

import { Film } from "./types.js";
import {
  convertRatingToNumber,
  getHtmlContent,
  parseDateString,
  sleep,
} from "./utils.js";

export async function fetchLetterboxdFilms(
  username: string,
  maxPages: number = 5,
): Promise<{ films: Film[]; totalPages: number; fetchedPages: number }> {
  return await fetchLetterboxdData(
    username,
    fetchLetterboxdFilmsByPage,
    maxPages,
  );
}

export async function fetchLetterboxdFilmsByPage(
  username: string,
  page: number = 1,
): Promise<{ films: Film[]; totalPages: number }> {
  const url = `https://letterboxd.com/${username}/films/page/${page}/`;

  const parseFilms = ($: cheerio.CheerioAPI): Film[] => {
    const films: Film[] = [];
    $("ul.poster-list li").each((_, elem) => {
      const poster = $(elem).find("div.poster");

      const id = String(poster.attr("data-film-id"));
      const name = String(poster.attr("data-film-name"));
      const year = String(poster.attr("data-film-release-year"));
      const slug = String(poster.attr("data-film-slug"));
      const posterUrl = String(poster.find("div img").attr("src"));

      const ratingString = $(elem).find("span.rating").text().trim() || "";

      let rating: number | undefined = undefined;
      if (ratingString || !$(elem).find("span.film-watch-link").length) {
        rating = convertRatingToNumber(ratingString);
      }

      films.push({
        id,
        name,
        year,
        slug,
        posterUrl,
        rating,
      });
    });
    return films;
  };

  return await fetchLetterboxdPageData(url, parseFilms, "ul.poster-list");
}

export async function fetchLetterboxdDiary(
  username: string,
  maxPages: number = 3,
): Promise<{ films: Film[]; totalPages: number; fetchedPages: number }> {
  return await fetchLetterboxdData(
    username,
    fetchLetterboxdDiaryEntriesByPage,
    maxPages,
  );
}

export async function fetchLetterboxdDiaryEntriesByPage(
  username: string,
  page: number = 1,
): Promise<{ films: Film[]; totalPages: number }> {
  const url = `https://letterboxd.com/${username}/films/diary/page/${page}/`;

  const parseFilms = ($: cheerio.CheerioAPI): Film[] => {
    const films: Film[] = [];
    let currentMonth = "";
    let currentYear = "";

    $("tr.diary-entry-row").each((_, elem) => {
      const row = $(elem);
      const tdCalendar = row.find("td.td-calendar");

      const dateDiv = tdCalendar.find("div.date");
      if (dateDiv.length > 0) {
        const monthStrong = dateDiv.find("strong a");
        if (monthStrong.length > 0) {
          currentMonth = monthStrong.text().trim();
        }

        const yearLink = dateDiv.find("a small");
        if (yearLink.length > 0) {
          currentYear = yearLink.text().trim();
        }
      }

      const dayTd = row.find("td.td-day");
      const dayLink = dayTd.find("a");
      const day = dayLink.text().trim();

      const dateString = `${day} ${currentMonth} ${currentYear}`;
      const dateObj = parseDateString(dateString);

      const filmTd = row.find("td.td-film-details");
      const filmNameH3 = filmTd.find("h3.headline-3 a");
      const name = filmNameH3.text().trim();

      const filmYearTd = row.find("td.td-released");
      const year = filmYearTd.text().trim();

      const filmPosterDiv = filmTd.find("div.react-component.poster");
      const id = filmPosterDiv.attr("data-film-id");

      const slug = String(filmPosterDiv.attr("data-film-slug"));

      const imgElement = filmPosterDiv.find("div img");
      const posterUrl = imgElement.attr("src") || "";

      const ratingTd = row.find("td.td-rating");
      const starsString = ratingTd.find("span.rating").text().trim();
      const rating = starsString
        ? convertRatingToNumber(starsString)
        : undefined;

      films.push({
        id: id || "",
        name,
        year,
        slug,
        datetime: dateObj,
        rating,
        posterUrl,
      });
    });
    return films;
  };

  return await fetchLetterboxdPageData(url, parseFilms);
}

export async function fetchLetterboxdReviews(
  username: string,
  maxPages: number = 6,
): Promise<{ films: Film[]; totalPages: number; fetchedPages: number }> {
  return await fetchLetterboxdData(
    username,
    fetchLetterboxdReviewsByPage,
    maxPages,
  );
}

export async function fetchLetterboxdReviewsByPage(
  username: string,
  page: number = 1,
): Promise<{ films: Film[]; totalPages: number }> {
  const url = `https://letterboxd.com/${username}/films/reviews/page/${page}/`;

  const parseFilms = ($: cheerio.CheerioAPI): Film[] => {
    const films: Film[] = [];

    $("ul.poster-list li.film-detail").each((_, elem) => {
      const posterDiv = $(elem).find("div.film-poster");

      const id = String(posterDiv.attr("data-film-id"));
      const name = String(posterDiv.attr("data-film-name"));
      const year = String(posterDiv.attr("data-film-release-year"));
      const slug = String(posterDiv.attr("data-film-slug"));

      let posterUrl = "";
      const imgElement = posterDiv.find("img");
      if (imgElement.length > 0) {
        posterUrl = imgElement.attr("src") || "";
      }

      const attribution = $(elem).find("div.film-detail-content p.attribution");
      const ratingString = attribution.find("span.rating").text().trim() || "";

      let rating: number | undefined = undefined;
      if (ratingString) {
        rating = convertRatingToNumber(ratingString);
      }

      const dateSpan = attribution.find("span.date");
      const dateText = dateSpan.text().trim();

      const actionMatch = dateText.match(/^(Added|Watched|Rewatched)/);
      const action = actionMatch ? actionMatch[1] : "";

      let datetime: Date | undefined = undefined;
      const timeElement = dateSpan.find("time");
      if (timeElement.length > 0) {
        const datetimeAttr = timeElement.attr("datetime");
        if (datetimeAttr) {
          datetime = new Date(datetimeAttr);
        }
      } else {
        const nobrElement = dateSpan.find("span._nobr");
        if (nobrElement.length > 0) {
          datetime = parseDateString(nobrElement.text().trim());
        } else {
          const dateTextWithoutAction = dateText.replace(
            /^(Added|Watched|Rewatched)\s*/,
            "",
          );
          datetime = parseDateString(dateTextWithoutAction.trim());
        }
      }

      const reviewDiv = $(elem).find("div.body-text");
      const reviewText = reviewDiv.text().trim();

      const likesP = $(elem).find("p.like-link-target");
      const likesLink = likesP.find("a");
      const likesText = likesLink.text().trim();

      const likesMatch = likesText.match(/(\d+)\s+like/);
      const likesCount = likesMatch ? parseInt(likesMatch[1], 10) : 0;

      films.push({
        id,
        name,
        year,
        slug,
        posterUrl,
        rating,
        datetime,
        action,
        reviewText,
        likesCount,
      });
    });

    return films;
  };

  return await fetchLetterboxdPageData(url, parseFilms, "ul.poster-list");
}

/**
 * Private helper function to get paginated Letterboxd data.
 * 
 * TODO(michaelfromyeg): implement caching around this function based on pageFetcher.name, username
 */
async function fetchLetterboxdData(
  username: string,
  pageFetcher: (
    username: string,
    page: number,
  ) => Promise<{ films: Film[]; totalPages: number }>,
  maxPages: number,
): Promise<{ films: Film[]; totalPages: number; fetchedPages: number }> {
  const { films: firstFilms, totalPages } = await pageFetcher(username, 1);

  const pagesToFetch = Math.min(totalPages, maxPages);
  const pagePromises = [];

  for (let i = 2; i <= pagesToFetch; i++) {
    pagePromises.push(pageFetcher(username, i));
  }

  const fetchedPages = await Promise.all(pagePromises);

  const films = [
    ...firstFilms, 
    ...fetchedPages.flatMap(({ films: fetchedFilms }) => fetchedFilms)
  ];
  return { films, totalPages, fetchedPages: pagesToFetch };
}

/**
 * Private helper function to get the content of a single Letterboxd page.
 */
async function fetchLetterboxdPageData(
  url: string,
  parseFilms: ($: cheerio.CheerioAPI) => Film[],
  contentSelector?: string,
): Promise<{ films: Film[]; totalPages: number }> {
  console.log("Fetching Letterboxd page:", url);

  let html = "";
  try {
    html = await getHtmlContent(url, contentSelector);
  } catch (error) {
    console.error(error);
    throw error;
  }

  const $ = cheerio.load(html);
  const films = parseFilms($);

  const totalPages = Number($(".paginate-pages li:last-child a").text()) || 1;
  return { films, totalPages };
}

export async function addTmdbPosterUrls(
  films: Array<Pick<Film, "name" | "year" | "tmdbPosterUrl">>,
  apiKey?: string,
): Promise<void> {
  const TMDB_API_KEY = process.env.TmdbApiKey || apiKey;

  if (!TMDB_API_KEY) {
    throw new Error("TMDB_API_KEY is not set in the environment variables.");
  }

  const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
  const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
  const POSTER_SIZE = "w500";

  for (const film of films) {
    try {
      const searchUrl = `${TMDB_API_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        film.name,
      )}&year=${encodeURIComponent(film.year)}`;
      const response = await fetch(searchUrl);

      if (!response.ok) {
        console.error(
          `Failed to fetch TMDB data for film: ${film.name} (status ${response.status})`,
        );
        continue;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await response.json();
      if (data.results && data.results.length > 0) {
        // Attempt to find an exact match
        const exactMatch = data.results.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (m: any) =>
            m.title.toLowerCase() === film.name.toLowerCase() &&
            m.release_date &&
            m.release_date.startsWith(film.year),
        );

        const movie = exactMatch || data.results[0];
        const posterPath = movie.poster_path;

        if (posterPath) {
          film.tmdbPosterUrl = `${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${posterPath}`;
        } else {
          console.warn(`No poster path found for film: ${film.name}`);
        }
      } else {
        console.warn(`No results found for film: ${film.name}`);
      }
    } catch (error) {
      console.error(`Error fetching TMDB data for film: ${film.name}`, error);
    }
  }
}

export async function addLetterboxdSlug(
  films: Array<Pick<Film, "name" | "year" | "slug">>,
): Promise<void> {
  for (const film of films) {
    if (film.slug) {
      // Slug already exists
      continue;
    }

    const possibleSlugs = generatePossibleSlugs(film.name, film.year);

    for (const slug of possibleSlugs) {
      const url = `https://letterboxd.com/film/${slug}/`;
      try {
        const response = await fetch(url, { method: "HEAD" });

        if (response.ok) {
          // Found a valid slug
          film.slug = slug;
          break;
        } else if (response.status === 404) {
          // Slug does not exist
          continue;
        } else {
          // Other HTTP error
          console.error(`Error fetching URL ${url}: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Error fetching URL ${url}:`, error);
      }

      await sleep(100);
    }

    if (!film.slug) {
      console.warn(`Could not find slug for film: ${film.name} (${film.year})`);
    }
  }
}

function generatePossibleSlugs(name: string, year: string): string[] {
  const baseSlug = slugify(name);
  const yearSlug = year ? `${baseSlug}-${year}` : '';

  const possibleSlugs: string[] = [];
  if (yearSlug) {
    possibleSlugs.push(yearSlug);
  }

  possibleSlugs.push(baseSlug);

  return possibleSlugs;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
