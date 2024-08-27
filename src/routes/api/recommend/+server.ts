import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

interface Movie {
  title: string;
  poster: string;
  reason: string;
}

const genres: string[] = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Fantasy'];

function getRandomGenre(): string {
  return genres[Math.floor(Math.random() * genres.length)];
}

function generateMovie(index: number): Movie {
  const title = `Movie ${index}`;
  const genre = getRandomGenre();
  return {
    title,
    poster: `https://placehold.co/300x450/3498db/ffffff?text=${encodeURIComponent(title)}`,
    reason: `Top ${genre} movie based on your watch history`
  };
}

export const GET: RequestHandler = async ({ url }) => {
  if (Math.random() < 0.5) {
    throw error(500, 'Random error occurred');
  }
  
  const username = url.searchParams.get('username');
  const genre = url.searchParams.get('genres');

  console.log(`Received request for user: ${username}, genre: ${genre}`);

  const recommendations: Movie[] = Array.from({ length: 4 }, (_, i) => generateMovie(i + 1));

  return new Response(JSON.stringify(recommendations), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
