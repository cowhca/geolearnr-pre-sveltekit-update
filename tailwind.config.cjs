/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				beige: '#c8b7a6',
				perriwinkle: '#7d94b5',
				'dusty-rose': '#c29591',
				'maroon-brown': '#703f37',
				'muted-green': '#b6c199'
			}
		}
	},
	plugins: []
};
