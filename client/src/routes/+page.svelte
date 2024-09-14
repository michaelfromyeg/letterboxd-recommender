<script lang="ts">
	import { onMount } from 'svelte';
	import letterboxdLogo from '../assets/letterboxd.svg';

	// types
	interface Movie {
		name: string;
		year: string;
		reason: string;

		tmdbPosterUrl?: string;
	}

	// form inputs
	let username = '';
	let genre = '';
	let sourceType = 'Diary';

	// page content
	let recommendations: Movie[] = [];
	let loading = false;
	let error: string | null = null;
	let accentColor: string;

	// static data
	const genres: string[] = [
		'Action',
		'Adventure',
		'Animation',
		'Comedy',
		'Crime',
		'Documentary',
		'Drama',
		'Family',
		'Fantasy',
		'History',
		'Horror',
		'Music',
		'Mystery',
		'Romance',
		'Science Fiction',
		'Thriller',
		'War',
		'Western'
	];
	const accentColors = ['#00E054', '#40BCF4', '#FF8000'];

	let apiBaseUrl: string;
	if (import.meta.env.MODE === 'development') {
		apiBaseUrl = 'http://localhost:3000';
	} else {
		apiBaseUrl = 'https://v2ibpvirn2.execute-api.us-west-2.amazonaws.com/Prod';
	}

	async function getRecommendations(): Promise<void> {
		loading = true;
		error = null;

		try {
			const response = await fetch(
				`${apiBaseUrl}/recommend?username=${encodeURIComponent(username)}&genre=${encodeURIComponent(genre)}&source=${encodeURIComponent(sourceType)}`
			);
			if (!response.ok) {
				throw new Error('Failed to fetch recommendations.');
			}
			recommendations = await response.json();
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
		} finally {
			loading = false;
		}
	}

	function resetForm(): void {
		recommendations = [];
		error = null;
	}

	onMount(() => {
		document.body.classList.add('font-inter');
		accentColor = accentColors[Math.floor(Math.random() * accentColors.length)];
	});
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main
	class="min-h-screen bg-[#14181c] text-white font-inter flex justify-center items-start pt-0 sm:pt-0"
>
	<div class="w-full max-w-4xl px-4 py-4 sm:py-12">
		<div class="flex flex-col items-center mb-8">
			<img
				src={letterboxdLogo}
				alt="Letterboxd Logo"
				class="w-12 h-12 mb-4"
				style="filter: drop-shadow(0 0 0.75rem {accentColor});"
			/>
			<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
				<span style="color: {accentColor};" class="block xs:inline">Letterboxd</span><span
					class="block xs:inline">Recommender</span
				>
			</h1>
		</div>

		{#if !recommendations.length && !loading && !error}
			<div class="w-full bg-[#1c2228] p-4 sm:p-8 rounded-lg shadow-lg">
				<form on:submit|preventDefault={getRecommendations} class="space-y-6 sm:space-y-8">
					<div
						class="text-lg sm:text-xl text-gray-300 leading-relaxed flex flex-col items-center space-y-4"
					>
						<span class="text-center">I want movie recommendations for</span>
						<input
							type="text"
							bind:value={username}
							class="inline-input w-full max-w-xs"
							required
							placeholder="(some Letterboxd username)"
							style="--accent-color: {accentColor};"
						/>
						<span class="text-center">based on their</span>
						<div class="flex flex-row justify-center items-center space-x-6">
							<label class="flex items-center space-x-2">
								<input
									type="radio"
									bind:group={sourceType}
									value="Diary"
									class="custom-radio"
									style="--accent-color: {accentColor};"
								/>
								<span>Diary</span>
							</label>
							<label class="flex items-center space-x-2">
								<input
									type="radio"
									bind:group={sourceType}
									value="Reviews"
									class="custom-radio"
									style="--accent-color: {accentColor};"
								/>
								<span>Reviews</span>
							</label>
						</div>
						<span class="text-center">in the genre of</span>
						<select
							bind:value={genre}
							class="custom-select w-full max-w-xs"
							style="--accent-color: {accentColor};"
						>
							<option value="">Any genre</option>
							{#each genres as genreOption}
								<option value={genreOption}>{genreOption}</option>
							{/each}
						</select>
					</div>
					<div class="flex justify-center">
						<button
							type="submit"
							class="btn-primary w-full max-w-xs"
							style="--accent-color: {accentColor};">Go!</button
						>
					</div>
				</form>
			</div>
		{/if}

		{#if loading && !error}
			<div class="flex justify-center items-center h-48 sm:h-64">
				<div class="loader" style="--accent-color: {accentColor};"></div>
			</div>
		{/if}

		{#if error}
			<div class="max-w-md mx-auto bg-[#1c2228] p-6 sm:p-8 rounded-lg shadow-lg text-center">
				<p class="text-red-500 mb-4">{error}</p>
				<button on:click={resetForm} class="btn-secondary" style="--accent-color: {accentColor};"
					>Try Again</button
				>
			</div>
		{/if}

		{#if recommendations.length}
			<div
				class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12"
			>
				{#each recommendations as movie}
					<div class="movie-card group" style="--accent-color: {accentColor};">
						<img src={movie.tmdbPosterUrl} alt={movie.name} class="w-full h-auto rounded-t-lg" />
						<div class="p-4 bg-[#1c2228] rounded-b-lg">
							<h3
								class="text-base sm:text-lg font-semibold mb-2 group-hover:text-[var(--accent-color)] transition-colors"
							>
								{movie.name} ({movie.year})
							</h3>
							<p class="text-xs sm:text-sm text-gray-400">{movie.reason}</p>
						</div>
					</div>
				{/each}
			</div>
			<div class="text-center mt-8 sm:mt-12">
				<button on:click={resetForm} class="btn-primary" style="--accent-color: {accentColor};"
					>Go again</button
				>
			</div>
		{/if}
	</div>
</main>

<style lang="postcss">
	:global(body) {
		@apply bg-[#14181c] text-white font-inter;
	}

	.inline-input {
		@apply px-2 py-1 text-white bg-transparent border-b-2 border-gray-700 focus:outline-none transition duration-300 ease-in-out;
		min-width: 150px;
	}

	.inline-input:focus {
		border-color: var(--accent-color);
	}

	.custom-select {
		@apply block w-full px-3 py-2 text-white bg-[#2c3440] border border-gray-700 rounded-md shadow-sm appearance-none cursor-pointer;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0.75rem center;
		background-size: 1em 1em;
		padding-right: 2.5rem;
	}

	.custom-select:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--accent-color);
		border-color: var(--accent-color);
	}

	.custom-select option {
		@apply bg-[#2c3440] text-white;
	}

	.btn-primary {
		@apply px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#14181c] transition duration-300 ease-in-out;
		background-color: var(--accent-color);
		color: #1c2228;
	}

	.btn-primary:hover {
		filter: brightness(90%);
	}

	.btn-secondary {
		@apply bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#14181c] transition duration-300 ease-in-out;
	}

	.movie-card {
		@apply bg-[#1c2228] rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out;
	}

	.movie-card:hover {
		box-shadow:
			0 0 10px rgba(0, 224, 84, 0.4),
			0 0 20px rgba(0, 224, 84, 0.3);
	}

	.loader {
		@apply border-4 border-gray-700 rounded-full w-10 h-10 sm:w-12 sm:h-12 animate-spin;
		border-top-color: var(--accent-color);
	}

	.custom-radio {
		appearance: none;
		background-color: transparent;
		margin: 0;
		font: inherit;
		color: var(--accent-color);
		width: 1.25em;
		height: 1.25em;
		border: 2px solid #4a5568;
		border-radius: 50%;
		display: grid;
		place-content: center;
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease;
	}

	.custom-radio::before {
		content: '';
		width: 0.65em;
		height: 0.65em;
		border-radius: 50%;
		transform: scale(0);
		transition: 120ms transform ease-in-out;
		background-color: var(--accent-color);
	}

	.custom-radio:checked::before {
		transform: scale(1);
	}

	.custom-radio:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--accent-color);
	}
</style>
