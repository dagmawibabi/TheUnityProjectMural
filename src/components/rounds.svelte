<script lang="ts">
	import { sharedState } from '../store/shared_state.svelte';
</script>

<div class="flex items-center justify-center gap-x-4 pb-28">
	<span class="font-mono text-zinc-500"> Choose A Mural: </span>
	{#each sharedState.rounds as round}
		<div class="grid gap-y-4">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class={sharedState.chosenArtGrid == round.index
					? 'cursor-pointer rounded-full border border-emerald-500 bg-zinc-900 px-10 py-1 pb-2 text-sm font-semibold text-emerald-500 '
					: 'cursor-pointer rounded-full border border-zinc-800 bg-zinc-900 px-10 py-1 pb-2 text-sm font-semibold text-zinc-400 hover:border-emerald-800'}
				onclick={() => {
					sharedState.chosenArtGrid = round.index;
					sharedState.chosenSize = round.defaultSize;
				}}
			>
				<span>
					{round.name}
				</span>
			</div>
		</div>
	{/each}
</div>
