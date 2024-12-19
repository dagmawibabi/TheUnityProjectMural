<script lang="ts">
	let { art } = $props();
</script>

<div class="group relative overflow-clip transition-all hover:scale-150 hover:rounded-xl">
	<div class="h-[200px] w-[200px]">
		<img src={art.image} alt={art.artist} class="object-fit absolute -z-40 h-full w-full" />
	</div>

	<div
		class="relative mx-auto -mt-7 hidden w-fit rounded-full border border-zinc-600 bg-black px-3 py-1 text-xs text-white transition-all group-hover:block group-hover:scale-75"
	>
		{art.artist}
	</div>
</div>
