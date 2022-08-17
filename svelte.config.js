import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	serverhost: true,
	kit: {
		adapter: adapter({ out: 'build' })
	}
};

export default config;
