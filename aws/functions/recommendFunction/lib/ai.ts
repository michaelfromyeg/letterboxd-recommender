import fetch from 'node-fetch';

import { arrayToCSV } from './csv.js';
import { RecommendedFilm, Film } from './types.js';

export async function getChatGPTRecommendations(
	seenFilms: Film[],
	reviewedFilms: Film[],
  alreadySeen: RecommendedFilm[],
	genre: string | undefined,
	retries: number = 3
): Promise<RecommendedFilm[]> {
	if (retries <= 0) {
		throw new Error('Failed to get ChatGPT recommendations after retries');
	}

	const apiKey = process.env.OPEN_API_KEY as string;

	if (reviewedFilms.length > 100) {
		// shuffle the array and take the first 100, to give a reasonable sample
		reviewedFilms.sort(() => Math.random() - 0.5);
		reviewedFilms = reviewedFilms.slice(0, 100);
	}

  // create prompt ready version of reviewed films
  const sanitizedFilms: Array<Record<string, unknown>> = [...reviewedFilms]
    .map((film) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, posterUrl, tmdbPosterUrl, likesCount, ...rest } = film;
      return rest;
    })
    .map((film) => {
      const { datetime, ...rest } = film;
      if (!datetime) {
        return film;
      }

      return { ...rest, reviewedOn: new Date(datetime).toLocaleDateString() };
    });
	const csvData = arrayToCSV(sanitizedFilms);

	// TODO(michaelfromyeg): add Gemini support
	const apiUrl = 'https://api.openai.com/v1/chat/completions';

	const genrePrompt = genre ? `I'd like to watch a movie in the ${genre} genre. ` : '';
  const alreadySeenPrompt = alreadySeen.length > 0 ? `I've already seen ${alreadySeen.map((film) => film.name).join(', ')} also. DO NOT recommend those.` : '';
	const prompt = `${genrePrompt}Based on my Letterboxd reviews, recommend 4 movies I haven't seen before. 

${csvData}

Provide your recommendations in the following JSON format:
[
  {
    "name": "Movie Title 1",
    "year": "2001",
    "reason": "Brief reason for recommendation"
  },
  {
    "name": "Movie Title 2",
    "year": "2002",
    "reason": "Brief reason for recommendation"
  },
  {
    "name": "Movie Title 3",
    "year": "2003",
    "reason": "Brief reason for recommendation"
  },
  {
    "name": "Movie Title 4",
    "year": "2004",
    "reason": "Brief reason for recommendation"
  }
]
where name is the title of the movie, year is its release year, and the reason is a brief explanation for the recommendation. The reasoning should show a clear link to my Letterboxd reviews.

The movie recommendations must be new movies, i.e., they should NOT be present within my reviews.${alreadySeenPrompt} Your response must be valid JSON.`;

  if (process.env.NODE_ENV === 'developmentfalse') {
    console.log('ChatGPT prompt:', prompt);
    return Array.from({ length: 4 }, (_, i) => ({
      name: `Movie Title ${i + 1}`,
      year: `200${i + 1}`,
      reason: `Reason for recommendation ${i + 1}`
    }));
  } else {
    if (!apiKey) {
      throw new Error('Missing OpenAI API key');
    }
  }

	const response = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: 'gpt-4o-mini', // gpt-3.5-turbo
			messages: [{ role: 'user', content: prompt }],
			temperature: 0.7
		})
	});

	if (!response.ok) {
		throw new Error(`ChatGPT API request failed: ${response.statusText}`);
	}

	const data = await response.json();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let recommendationsJson = (data as any).choices[0].message.content;

	// check if the answer is wrapped by ```json ... ``` and strip that
	const jsonStart = recommendationsJson.indexOf('```json');
	if (jsonStart !== -1) {
		recommendationsJson = recommendationsJson.slice(jsonStart + 7);
		const jsonEnd = recommendationsJson.indexOf('```');
		if (jsonEnd !== -1) {
			recommendationsJson = recommendationsJson.slice(0, jsonEnd);
		}
	}

	try {
		const recommendedFilms = JSON.parse(recommendationsJson) as RecommendedFilm[];

		if (recommendedFilms.length !== 4) {
			console.warn('Received unexpected number of recommendations:', recommendedFilms);
			return await getChatGPTRecommendations(seenFilms, reviewedFilms, alreadySeen, genre, retries - 1);
		}

		const newAlreadySeen = recommendedFilms.filter((film) =>
			seenFilms.some((seenFilm) => seenFilm.name === film.name)
		);
		if (newAlreadySeen.length >= 2) {
			console.warn('Received more than 50% duplicate recommendations:', recommendedFilms);
			return await getChatGPTRecommendations(seenFilms, reviewedFilms, [...alreadySeen, ...newAlreadySeen], genre, retries - 1);
		}

		return recommendedFilms;
	} catch (error) {
		console.error('Error parsing ChatGPT response:', error);
		throw new Error('Failed to parse ChatGPT recommendations');
	}
}
