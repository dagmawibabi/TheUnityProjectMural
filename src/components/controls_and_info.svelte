<script lang="ts">
	import { onMount } from 'svelte';
	import { artList } from '../store/images.svelte';
	import { sharedState } from '../store/shared_state.svelte';
	import MobileArtGridSwitch from './mobile_art_grid_switch.svelte';
	import Rounds from './rounds.svelte';

	const FALLBACK_VISITORS = 11038;
	let visitorCount = $state(FALLBACK_VISITORS);

	async function readVisitorCount(method: 'GET' | 'POST') {
		try {
			const res = await fetch('/api/visitors', { method });
			if (!res.ok) return;
			const data = (await res.json()) as { count?: number };
			if (typeof data.count === 'number') visitorCount = data.count;
		} catch {
			// Keep the last known count on the page.
		}
	}

	onMount(() => {
		readVisitorCount('POST');
		const interval = setInterval(() => readVisitorCount('GET'), 30000);
		return () => clearInterval(interval);
	});
</script>

<div>
	<!-- ROUND CONTROL -->
	<div class="flex justify-center pb-2 md:hidden lg:hidden xl:hidden 2xl:hidden">
		<MobileArtGridSwitch />
	</div>

	<div>
		<Rounds />
	</div>

	<div class="grid w-full justify-center gap-x-4 gap-y-2 md:flex lg:flex xl:flex 2xl:flex">
		<!-- Art Count -->
		<div
			class="flex items-center justify-center rounded-full border-emerald-800 px-5 font-semibold uppercase text-emerald-600 md:border lg:border xl:border 2xl:border"
		>
			This round has
			<span class="px-1 text-emerald-500">
				{sharedState.chosenArtGrid == 1
					? artList.first.length
					: sharedState.chosenArtGrid == 2
						? artList.second.length - 20
						: artList.third.length}
			</span> art pieces
		</div>

		<!-- SIZE CONTROL -->
		<div class="hidden items-center gap-x-3 text-xs text-zinc-600 md:flex lg:flex xl:flex 2xl:flex">
			{#each sharedState.sizes as size}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class={sharedState.chosenSize == size
						? 'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-emerald-500 text-emerald-500'
						: 'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-zinc-700 hover:border-emerald-800 hover:text-emerald-500'}
					onclick={() => (sharedState.chosenSize = size)}
				>
					<span> {size} </span>
				</div>
			{/each}
		</div>

		<!-- Visitor Count -->
		<div
			class="flex items-center justify-center rounded-full border-emerald-800 px-5 font-semibold uppercase text-emerald-600 md:border lg:border xl:border 2xl:border"
		>
			<span class="pr-1 text-emerald-500">{visitorCount}</span> art lovers have been here
		</div>
	</div>
</div>
