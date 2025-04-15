<script lang="ts">
	import Header from '../../components/header.svelte';
	import Contact from '../../components/contact.svelte';
	import Quote from '../../components/quote.svelte';
	import Footer from '../../components/footer.svelte';

	import AlertDialogTitle from '$lib/components/ui/alert-dialog/alert-dialog-title.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';

	import { page } from '$app/stores';
	import { artList } from '../../store/images.svelte';

	import EachArt from '../../components/each_art.svelte';
	import ArtistContributionArt from '../../components/artist_contribution_art.svelte';
	import ControlsAndInfo from '../../components/controls_and_info.svelte';
	import ArtGrids from '../../components/art_grids.svelte';
	import Contribute from '../../components/contribute.svelte';
	import ArtistContributionThemeTitle from '../../components/artist_contribution_theme_title.svelte';
	import ArtistContributionGrid from '../../components/artist_contribution_grid.svelte';
	let artistUsername = $page.url.toString().split('/')[3];

	let firstContributions: any[] = [];
	let secondContributions: any[] = [];
	let thirdContributions: any[] = [];
	function findContributions() {
		artList.first.forEach((art) => {
			if (art.link == artistUsername) {
				firstContributions.push(art);
			}
		});
		artList.second.forEach((art) => {
			if (art.link == artistUsername) {
				secondContributions.push(art);
			}
		});
		artList.third.forEach((art) => {
			if (art.link == artistUsername) {
				thirdContributions.push(art);
			}
		});
	}
	findContributions();
</script>

<div class="h-screen w-screen overflow-scroll">
	<!-- INTRO -->
	<Header showPragraph={false} />

	<div class="mx-auto w-full pt-4 text-center lg:w-1/2 lg:pt-0 xl:w-1/2 xl:pt-0 2xl:w-1/2 2xl:pt-0">
		<div
			class="mx-auto text-lg font-bold text-emerald-500 md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl"
		>
			Contributions of
			<a
				href="https://www.instagram.com/{artistUsername}"
				class="border-b border-dashed border-emerald-800 underline-offset-8 hover:underline"
				target="_blank"
				rel="noopener"
			>
				@{artistUsername}
			</a>
		</div>

		<div class="px-4 py-4">
			<p
				class="text-center font-mono text-sm italic text-zinc-400 md:text-base lg:text-base xl:text-base 2xl:text-base"
			>
				Here are the contributions of

				<a
					href="https://www.instagram.com/{artistUsername}"
					class="text-emerald-500 underline-offset-8 hover:underline"
					target="_blank"
					rel="noopener"
				>
					@{artistUsername}
				</a>
				to the Ethiopian Artists Theme, Christian Cross Theme, and in the upcoming Third Theme. The number
				in the circle shows the amount of artpieces contributed.
			</p>
		</div>

		<div class="grid gap-y-5">
			<!-- First Round  -->
			{#if firstContributions.length > 0}
				<ArtistContributionGrid
					theme="Ethiopian Artists Theme"
					contributions={firstContributions}
					{artistUsername}
				/>
			{/if}

			<!-- Second Round  -->
			{#if secondContributions.length > 0}
				<ArtistContributionGrid
					theme="Christian Cross Theme"
					contributions={secondContributions}
					{artistUsername}
				/>
			{/if}

			<!-- Third Round  -->
			{#if thirdContributions.length > 0}
				<ArtistContributionGrid
					theme="Space Theme"
					contributions={thirdContributions}
					{artistUsername}
				/>
			{/if}
		</div>
	</div>

	<!-- CONTRIBUTE -->
	<Contribute />

	<!-- CONTACT -->
	<Contact />

	<!-- QUOTE -->
	<Quote />

	<!-- Footer -->
	<Footer />
</div>
