<script lang="ts">
	import { artList } from '../store/images.svelte';
	import { sharedState } from '../store/shared_state.svelte';
	import EachArt from './each_art.svelte';
</script>

{#if sharedState.chosenArtGrid == 1}
	<!-- FIRST -->
	<div class="py-5">
		<div
			class="mx-auto grid w-fit grid-cols-5 rounded-xl border border-zinc-800 bg-zinc-900 p-2 shadow-lg shadow-neutral-900 drop-shadow-md"
		>
			{#each artList.first as art}
				<EachArt {art} size={sharedState.chosenSize} />
			{/each}
		</div>
	</div>
{:else if sharedState.chosenArtGrid == 2}
	<!-- SECOND -->
	<div class="py-5">
		<div
			class="mx-auto grid w-fit grid-cols-6 rounded-xl border border-zinc-800 bg-zinc-900 p-2 shadow-lg shadow-neutral-900 drop-shadow-md"
		>
			{#each artList.second as art}
				<EachArt {art} size={sharedState.chosenSize} />
			{/each}
		</div>
	</div>
{:else}
	<!-- THIRD -->
	<div class="py-5">
		<div
			class="mx-auto grid w-fit grid-cols-5 rounded-xl border border-zinc-800 bg-zinc-900 p-2 shadow-lg shadow-neutral-900 drop-shadow-md"
		>
			{#each artList.third as art}
				<EachArt {art} size={sharedState.chosenSize} />
			{/each}
		</div>
	</div>
{/if}
