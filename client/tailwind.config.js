/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'letterboxd-green': '#00e054',
				'letterboxd-dark': '#14181c',
				'letterboxd-card': '#1c2228'
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif']
			},
			screens: {
				xs: '480px'
			}
		}
	},
	plugins: []
};
