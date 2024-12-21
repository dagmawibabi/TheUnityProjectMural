<script lang="ts">
	import { sharedState } from '../store/shared_state.svelte';
</script>

<div
	class="mx-auto hidden flex-row items-center justify-center pb-6 md:flex lg:flex xl:flex 2xl:flex"
>
	<!-- <div class="font-mono text-zinc-500">Choose A Mural:</div> -->
	{#each sharedState.rounds as round}
		<div class="px-2 py-1">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class={sharedState.chosenArtGrid == round.index
					? 'w-fit cursor-pointer rounded-full border border-emerald-500 bg-zinc-900 px-10 py-1 pb-2 font-semibold text-emerald-500 2xl:px-10'
					: 'w-fit cursor-pointer rounded-full border border-zinc-800 bg-zinc-900 px-10 py-1 pb-2 font-semibold text-zinc-400 hover:border-emerald-800 2xl:px-10'}
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
