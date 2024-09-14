export interface Film {
  id: string;
  name: string;
  year: string;
  posterUrl: string;
  rating?: number;

  // TODO(michaelfromyeg): break into separate type?
  // if a film is reviewed, it also has reviewText and a datetime
  datetime?: Date;
  action?: string; // one-of added, watched, re-watched
  reviewText?: string;
  likesCount?: number;

  tmdbPosterUrl?: string;
}

export interface RecommendedFilm {
	name: string;
	year: string;
	tmdbPosterUrl?: string;

	reason: string;
}
