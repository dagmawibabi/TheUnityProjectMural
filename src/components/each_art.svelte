<script lang="ts">
	let { art, size } = $props();
	import AlertDialogTitle from '$lib/components/ui/alert-dialog/alert-dialog-title.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
</script>

<AlertDialog.Root>
	<div
		class={size == 'XL'
			? 'group relative h-[250px] w-[250px] overflow-clip transition-all hover:scale-150 hover:rounded-xl'
			: size == 'L'
				? 'group relative h-[200px] w-[200px] overflow-clip transition-all hover:scale-150 hover:rounded-xl'
				: size == 'M'
					? 'group relative h-[150px] w-[150px] overflow-clip transition-all hover:scale-150 hover:rounded-xl'
					: size == 'S'
						? 'group relative h-[100px] w-[100px] overflow-clip transition-all hover:scale-150 hover:rounded-xl'
						: 'group relative h-[50px] w-[50px]'}
	>
		{#if art.image == null}
			<!-- EMPTY -->
			<div class="flex items-center justify-center"></div>
		{:else if art.image == ''}
			<!-- OPEN SPOTS -->
			<div
				class="relative -z-50 flex h-full w-full items-center justify-center bg-zinc-950 text-xs text-white"
			>
				{art.position}
			</div>
		{:else}
			<!-- ART -->

			<AlertDialog.Trigger class="absolute -z-40 h-full w-full">
				<img src={art.image} alt={art.artist} class="object-fit h-full w-full" />
			</AlertDialog.Trigger>

			<AlertDialog.Content class="w-[700px] border-none bg-zinc-950">
				<AlertDialogTitle class="text-emerald-500">
					{art.artist} — @{art.link}
				</AlertDialogTitle>
				<AlertDialog.Header class="">
					<AlertDialog.Description>
						<img
							src={art.image}
							alt={art.artist}
							class="object-fit h-full w-full transition-all hover:scale-[2]"
						/>
					</AlertDialog.Description>
				</AlertDialog.Header>

				<AlertDialog.Footer>
					<AlertDialog.Cancel class="border-none bg-zinc-900 text-white">Cancel</AlertDialog.Cancel>
					<a href="https://www.instagram.com/{art.link}" target="_blank" rel="noopener">
						<AlertDialog.Action
							class="border border-emerald-700 text-emerald-500 hover:bg-emerald-500 hover:text-black"
						>
							Checkout The Artist
						</AlertDialog.Action>
					</a>
				</AlertDialog.Footer>
			</AlertDialog.Content>

			<div class="absolute bottom-0 left-0 right-0 z-50 transition-all">
				<div
					class={size == 'XL' || size == 'L' || size == 'M'
						? 'mx-auto hidden w-fit rounded-full border border-zinc-600 bg-black px-3 py-1 text-xs text-white group-hover:block group-hover:scale-75'
						: size == 'S'
							? 'hidden'
							: 'hidden'}
				>
					{art.artist}
				</div>
			</div>
		{/if}
	</div>
</AlertDialog.Root>
