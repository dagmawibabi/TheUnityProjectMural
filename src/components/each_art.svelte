<script lang="ts">
	let { art, size } = $props();
	import AlertDialogTitle from '$lib/components/ui/alert-dialog/alert-dialog-title.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
</script>

<AlertDialog.Root>
	<div
		class={size == 'XL'
			? 'group relative h-[65px] w-[65px] overflow-clip transition-all hover:scale-150 hover:rounded-xl md:h-[250px] md:w-[250px] lg:h-[250px] lg:w-[250px] xl:h-[250px] xl:w-[250px] 2xl:h-[250px] 2xl:w-[250px]'
			: size == 'L'
				? 'group relative h-[55px] w-[55px] overflow-clip transition-all hover:scale-150 hover:rounded-xl md:h-[200px] md:w-[200px] lg:h-[200px] lg:w-[200px]  xl:h-[200px] xl:w-[200px] 2xl:h-[200px] 2xl:w-[200px]'
				: size == 'M'
					? 'group relative h-[60px] w-[60px] overflow-clip transition-all hover:scale-150 hover:rounded-xl md:h-[150px] md:w-[150px] lg:h-[150px] lg:w-[150px] xl:h-[150px] xl:w-[150px] 2xl:h-[150px] 2xl:w-[150px]'
					: size == 'S'
						? 'group relative h-[60px] w-[60px] overflow-clip transition-all hover:scale-150 hover:rounded-xl md:h-[100px] md:w-[100px] lg:h-[100px] lg:w-[100px] xl:h-[100px] xl:w-[100px] 2xl:h-[100px] 2xl:w-[100px]'
						: 'group relative h-[60px] w-[60px] md:h-[50px] md:w-[50px] lg:h-[50px] lg:w-[50px] xl:h-[50px] xl:w-[50px] 2xl:h-[50px] 2xl:w-[50px] '}
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

			<AlertDialog.Content
				class="w-screen border-none bg-zinc-950 md:w-[700px] lg:w-[700px] xl:w-[700px] 2xl:w-[700px]"
			>
				<AlertDialogTitle class="text-emerald-500">
					By {art.artist} — @{art.link}
				</AlertDialogTitle>
				<AlertDialog.Header class="">
					<AlertDialog.Description>
						<img src={art.image} alt={art.artist} class="object-fit h-full w-full" />
					</AlertDialog.Description>
				</AlertDialog.Header>

				<AlertDialog.Footer class="gap-y-2">
					<AlertDialog.Cancel class="border-none bg-zinc-900 text-white">Cancel</AlertDialog.Cancel>
					<a href="https://www.instagram.com/{art.link}" target="_blank" rel="noopener">
						<AlertDialog.Action
							class="w-full border border-emerald-700 text-emerald-500 hover:bg-emerald-500 hover:text-black"
						>
							Checkout The Artist
						</AlertDialog.Action>
					</a>
					<a href="/{art.link}" target="_blank" rel="noopener">
						<AlertDialog.Action
							class="w-full border border-emerald-700 text-emerald-500 hover:bg-emerald-500 hover:text-black"
						>
							Artist's Contributions
						</AlertDialog.Action>
					</a>
				</AlertDialog.Footer>
			</AlertDialog.Content>

			<div
				class="bottom-0 left-0 right-0 z-50 hidden transition-all md:absolute lg:absolute xl:absolute 2xl:absolute"
			>
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
