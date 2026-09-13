<script lang="ts">
	import { artistHref, type WallPiece } from '$lib/artwork';
	import { getPrimaryArtistLink } from '$lib/utils';

	let { art }: { art: WallPiece } = $props();

	const link = $derived(getPrimaryArtistLink(art));
	const href = $derived(artistHref(art));
	const name = $derived(art.artist || link.label || 'Unknown artist');
</script>

{#if href}
	<a
		{href}
		target="_blank"
		rel="noopener noreferrer"
		class="tile relative block h-full w-full overflow-hidden focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-400"
	>
		<img src={art.image} alt={name} class="h-full w-full object-cover" />
		<div class="creator">
			<p>{name}</p>
		</div>
	</a>
{:else}
	<div class="tile relative h-full w-full overflow-hidden">
		<img src={art.image} alt={name} class="h-full w-full object-cover" />
		<div class="creator">
			<p>{name}</p>
		</div>
	</div>
{/if}

<style>
	.creator {
		pointer-events: none;
		position: absolute;
		inset: auto 0 0 0;
		padding: 2.25rem 0.5rem 0.5rem;
		background: linear-gradient(to top, rgb(0 0 0 / 0.82), rgb(0 0 0 / 0.15), transparent);
		opacity: 0;
		transition: opacity 280ms ease;
	}

	.creator p {
		margin: 0;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #34d399;
	}

	.tile:hover .creator,
	.tile:focus .creator,
	.tile:focus-visible .creator {
		opacity: 1;
	}
</style>
