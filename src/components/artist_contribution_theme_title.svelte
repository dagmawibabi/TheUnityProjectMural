<script lang="ts">
	let { title, length } = $props();
</script>

<div
	class="flex items-center justify-center gap-x-2 py-3 text-left font-mono text-lg font-bold text-emerald-500 lg:justify-normal lg:pl-8 xl:pl-8 2xl:pl-8"
>
	{title} —
	<div class="rounded-full border border-emerald-800 px-2">
		{length}
	</div>
</div>
