<script lang="ts">
	import { Download } from 'lucide-svelte';
	import { downloadCombinedGridImage } from '$lib/utils';
	import { artList } from '../store/images.svelte';
	import { sharedState } from '../store/shared_state.svelte';
	import EachArt from './each_art.svelte';

	let downloading = $state(false);

	const currentGrid = $derived(
		sharedState.chosenArtGrid == 1
			? { arts: artList.first, cols: 5, filename: 'unity-mural-round-1.png' }
			: sharedState.chosenArtGrid == 2
				? { arts: artList.second, cols: 6, filename: 'unity-mural-round-2.png' }
				: { arts: artList.third, cols: 5, filename: 'unity-mural-round-3.png' }
	);

	async function downloadGrid() {
		if (downloading) return;
		downloading = true;
		try {
			await downloadCombinedGridImage(currentGrid.arts, currentGrid.cols, currentGrid.filename);
		} catch (error) {
			console.error('Failed to download mural', error);
		} finally {
			downloading = false;
		}
	}
</script>

<div class="py-5">
	<div class="mx-auto w-fit">
		<div
			class="grid w-fit rounded-xl border border-zinc-800 bg-zinc-900 p-2 shadow-lg shadow-neutral-900 drop-shadow-md {currentGrid.cols ===
			6
				? 'grid-cols-6'
				: 'grid-cols-5'}"
		>
			{#each currentGrid.arts as art}
				<EachArt {art} size={sharedState.chosenSize} />
			{/each}
		</div>
		<div class="flex justify-end pt-1.5">
			<button
				type="button"
				onclick={downloadGrid}
				disabled={downloading}
				aria-label="Download mural as a single image"
				class="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 transition-colors hover:text-emerald-400 disabled:opacity-50"
			>
				<Download class="size-3" />
				{downloading ? 'Saving…' : 'Download'}
			</button>
		</div>
	</div>
	<div class="mx-auto flex flex-row items-center justify-center pt-6">
		<div class="px-2 py-1">
			<a
				href="/wall"
				class="block w-fit rounded-full border border-zinc-800 bg-zinc-900 px-10 py-1 pb-2 font-semibold text-zinc-400 hover:border-emerald-800 hover:text-emerald-500"
			>
				ENDLESS WALL
			</a>
		</div>
		<div class="px-2 py-1">
			<a
				href="/museum"
				class="block w-fit rounded-full border border-zinc-800 bg-zinc-900 px-10 py-1 pb-2 font-semibold text-zinc-400 hover:border-emerald-800 hover:text-emerald-500"
			>
				MUSEUM
			</a>
		</div>
	</div>
</div>
