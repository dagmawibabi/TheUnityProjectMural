import cloudflare from '@sveltejs/adapter-cloudflare';
import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Vercel sets VERCEL during its builds; everywhere else builds for Cloudflare.
		adapter: process.env.VERCEL ? vercel({ runtime: 'nodejs20.x' }) : cloudflare()
	}
};

export default config;
