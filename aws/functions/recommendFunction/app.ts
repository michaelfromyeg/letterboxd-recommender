import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import type { Film, RecommendedFilm } from "./lib/types";
import { getChatGPTRecommendations } from "./lib/ai.js";
import { addTmdbPosterUrls, fetchLetterboxdDiary, fetchLetterboxdFilms, fetchLetterboxdReviews } from "./lib/betterboxd.js";
// import { RECOMMENDATIONS } from "./mock.js";

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { username, genre, source } = event.queryStringParameters || {};
  console.log(`Received request for username: ${username}, genre: ${genre}, source: ${source}`);

  if (!username) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing username parameter' }),
    };
  }

  if (!source || !['Diary', 'Reviews'].includes(source)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing source parameter or invalid source' }),
    };
  }

  try {
    console.log("Fetching all user's seen films from Letterboxd");
    const { films: seenFilms } = await fetchLetterboxdFilms(username);

    console.log(`Successfully got seen films; now getting reviewed films from ${source}`);
    let reviewedFilms: Film[] = [];

    if (source === 'Diary') {
      const diary = await fetchLetterboxdDiary(username);
      reviewedFilms = diary.films;
    } else if (source === 'Reviews') {
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
    return {
      statusCode: 200,
      body: JSON.stringify(recommendedFilms),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error occurred while processing the request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: (error as any).message }),
    };
  }
}
