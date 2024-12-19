<script lang="ts">
	import EachArt from '../components/each_art.svelte';

	import { artList } from '../store/images.svelte';
</script>

<div class="mx-auto w-3/4 border p-1">
	Picturess

	<!-- SECOND -->
	<div class="py-5">
		<div class="mx-auto grid w-fit grid-cols-6 rounded-xl border p-2 shadow-sm drop-shadow-xl">
			{#each artList.second as art}
				{#if art.image == null}
					<div class="h-[200px] w-[200px]"></div>
				{:else}
					<EachArt {art} />
				{/if}
			{/each}
		</div>
	</div>

	<!-- FIRST -->
	<div class="py-5">
		<div class="mx-auto grid w-fit grid-cols-5 rounded-xl border p-2 shadow-sm drop-shadow-xl">
			{#each artList.first as art}
				<EachArt {art} />
			{/each}
		</div>
	</div>
</div>
