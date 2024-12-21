<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { sharedState } from '../store/shared_state.svelte';
</script>

<div class="flex items-center justify-center gap-x-6">
	<ChevronLeft
		class="cursor-pointer text-emerald-500 hover:scale-125"
		size={28}
		onclick={() => {
			if (sharedState.chosenArtGrid > 1) {
				sharedState.chosenArtGrid = sharedState.chosenArtGrid - 1;
			} else {
				sharedState.chosenArtGrid = sharedState.rounds.length;
			}

			if (sharedState.chosenArtGrid == 2) {
				sharedState.chosenSize = 'L';
			} else {
				sharedState.chosenSize = 'XL';
			}
		}}
	/>
	<div
		class="flex items-center rounded-full border border-emerald-500 px-4 pb-1 text-lg text-emerald-500"
	>
		{sharedState.rounds[sharedState.chosenArtGrid - 1]['name']}
	</div>
	<ChevronRight
		class="cursor-pointer text-emerald-500 hover:scale-125"
		size={28}
		onclick={() => {
			if (sharedState.chosenArtGrid == sharedState.rounds.length) {
				sharedState.chosenArtGrid = 1;
			} else {
				sharedState.chosenArtGrid = sharedState.chosenArtGrid + 1;
			}
			if (sharedState.chosenArtGrid == 2) {
				sharedState.chosenSize = 'L';
			} else {
				sharedState.chosenSize = 'XL';
			}
		}}
	/>
</div>
