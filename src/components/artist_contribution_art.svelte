<script lang="ts">
	let { art } = $props();
	import AlertDialogTitle from '$lib/components/ui/alert-dialog/alert-dialog-title.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger class="w-60 overflow-clip rounded-lg">
		<img src={art.image} alt={art.artist} class="object-fit inline-block h-full w-full" />
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

		<AlertDialog.Footer>
			<AlertDialog.Cancel class="border-none bg-zinc-900 text-white">Cancel</AlertDialog.Cancel>
			<a href="https://www.instagram.com/{art.link}" target="_blank" rel="noopener">
				<AlertDialog.Action
					class="w-full border border-emerald-700 text-emerald-500 hover:bg-emerald-500 hover:text-black"
				>
					Checkout The Artist
				</AlertDialog.Action>
			</a>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
