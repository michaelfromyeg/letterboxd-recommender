import fetch from 'node-fetch';
import type { RecommendedMovie } from './types';

export async function getChatGPTRecommendations(csvData: string, genre: string | null): Promise<RecommendedMovie[]> {
	const apiKey = process.env.OPEN_API_KEY as string;
  
  if (process.env.NODE_ENV === 'development') {
    console.log("Development mode")

    if (!apiKey) {
      console.warn("Giving a mock response, given", csvData)
      return [
        {
          title: "Movie Title 1",
          reason: "Brief reason for recommendation"
        },
        {
          title: "Movie Title 2",
          reason: "Brief reason for recommendation"
        },
        {
          title: "Movie Title 3",
          reason: "Brief reason for recommendation"
        },
        {
          title: "Movie Title 4",
          reason: "Brief reason for recommendation"
        }
      ]
    } else {
      console.log("Using API key", apiKey)
    }
  } else {
    if (!apiKey) {
      throw new Error('Missing OpenAI API key');
    }
  }

	const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const genrePrompt = genre ? `I'd like to watch a movie in the ${genre} genre. ` : '';
	const prompt = `
Based on the following CSV data of my Letterboxd rating history, recommend 4 movies I haven't seen before. ${genrePrompt} The CSV data is formatted as follows: Title,Rating,Year

where Rating is a score from 0.5 to 5, and Year is when I watched it. Weight more recent reviews more heavily.

${csvData}

Please provide your recommendations in the following JSON format:
[
  {
    "title": "Movie Title 1",
    "reason": "Brief reason for recommendation"
  },
  {
    "title": "Movie Title 2",
    "reason": "Brief reason for recommendation"
  },
  {
    "title": "Movie Title 3",
    "reason": "Brief reason for recommendation"
  },
  {
    "title": "Movie Title 4",
    "reason": "Brief reason for recommendation"
  }
]

where title is the title of the movie, and the reason is a brief explanation for the recommendation. Make sure to say why you recommded the film, based on my Letterboxd reviews. 

Make sure to recommend them new movies, not something they have seen before. 

Ensure that your response can be parsed as valid JSON.`;

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
		return JSON.parse(recommendationsJson) as RecommendedMovie[];
	} catch (error) {
		console.error('Error parsing ChatGPT response:', error);
		throw new Error('Failed to parse ChatGPT recommendations');
	}
}
