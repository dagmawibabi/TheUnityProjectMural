<script lang="ts">
	let { step } = $props();
</script>

<div>
	<div class="mx-auto h-7 w-1 border-l border-dotted border-zinc-700"></div>
	<div
		class="mx-auto w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-3 md:w-3/4 lg:w-3/4 xl:w-3/4 2xl:w-3/4"
	>
		{step}
	</div>
</div>
