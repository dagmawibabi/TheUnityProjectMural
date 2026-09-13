<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllArtwork } from '$lib/artwork';
	import { mountMuseum, type MuseumHandle } from '$lib/museum/scene';

	const catalog = $derived(getAllArtwork());

	let canvasEl: HTMLCanvasElement | undefined = $state();
	let progress = $state(0);
	let ready = $state(false);
	let locked = $state(false);
	let hovered = $state<string | null>(null);
	let handle: MuseumHandle | undefined;

	onMount(() => {
		if (!canvasEl) return;
		let disposed = false;
		mountMuseum(canvasEl, catalog, {
			onProgress: (ratio) => {
				if (!disposed) progress = ratio;
			},
			onReady: () => {
				if (!disposed) ready = true;
			},
			onLockChange: (isLocked) => {
				if (!disposed) locked = isLocked;
			},
			onHoverArt: (name) => {
				if (!disposed) hovered = name;
			}
		}).then((museum) => {
			if (disposed) museum.dispose();
			else handle = museum;
		});
		return () => {
			disposed = true;
			handle?.dispose();
		};
	});
</script>

<svelte:head>
	<title>Museum — The Unity Project Mural</title>
</svelte:head>

<div class="museum">
	<canvas bind:this={canvasEl} class="view"></canvas>

	<a href="/" class="home">The Unity Project Mural</a>

	{#if !ready}
		<div class="veil">
			<p class="eyebrow">The Unity Project</p>
			<h1>Museum</h1>
			<div class="bar"><span style="width: {Math.round(progress * 100)}%"></span></div>
			<p class="hint">Hanging the collection…</p>
		</div>
	{:else if !locked}
		<div class="veil enter">
			<p class="eyebrow">Walk the nave</p>
			<h1>Museum</h1>
			<p class="lede">
				Every piece from every theme, framed in teak and brass. Look closely. The plate carries the
				artist’s name.
			</p>
			<button type="button" onclick={() => handle?.enter()}>Enter the gallery</button>
			<ul>
				<li><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> walk</li>
				<li><kbd>Shift</kbd> hurry</li>
				<li>Mouse look · click a work to meet the artist</li>
				<li><kbd>Esc</kbd> leave look mode</li>
			</ul>
		</div>
	{:else}
		<div class="hud">
			<div class="cross"></div>
			{#if hovered}
				<p class="now">{hovered} · click to open</p>
			{:else}
				<p class="now quiet">WASD to walk</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.museum {
		position: fixed;
		inset: 0;
		background: #140e0a;
		color: #f3e6d4;
	}

	.view {
		display: block;
		width: 100%;
		height: 100%;
		cursor: default;
	}

	.home {
		position: fixed;
		top: 1rem;
		left: 1rem;
		z-index: 5;
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 10px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: #34d399;
		opacity: 0.8;
	}

	.home:hover {
		opacity: 1;
	}

	.veil {
		position: fixed;
		inset: 0;
		z-index: 4;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		background:
			radial-gradient(ellipse at 50% 20%, rgba(52, 211, 153, 0.12), transparent 42%),
			rgba(16, 10, 7, 0.72);
		text-align: center;
	}

	.veil.enter {
		background:
			radial-gradient(ellipse at 50% 20%, rgba(52, 211, 153, 0.1), transparent 42%),
			rgba(16, 10, 7, 0.46);
	}

	.eyebrow {
		margin: 0;
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 11px;
		letter-spacing: 0.38em;
		text-transform: uppercase;
		color: #34d399;
	}

	h1 {
		margin: 0.4rem 0 0;
		font-family: Palatino, 'Palatino Linotype', 'Times New Roman', serif;
		font-size: clamp(3rem, 8vw, 6.5rem);
		font-weight: 600;
		letter-spacing: 0.04em;
		color: #f6ead8;
	}

	.lede {
		max-width: 34rem;
		margin: 1rem 0 1.6rem;
		font-family: Palatino, 'Palatino Linotype', serif;
		font-size: 1.05rem;
		line-height: 1.55;
		color: #e4d3bb;
	}

	.hint {
		margin-top: 0.75rem;
		font-family: ui-monospace, Menlo, Consolas, monospace;
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #a8947c;
	}

	.bar {
		width: min(16rem, 70vw);
		height: 2px;
		margin-top: 1.5rem;
		background: #3a2a1c;
	}

	.bar span {
		display: block;
		height: 100%;
		background: #34d399;
		transition: width 160ms linear;
	}

	button {
		appearance: none;
		border: 1px solid #c4a574;
		background: #c4a574;
		color: #1a120a;
		padding: 0.75rem 1.6rem;
		font-family: Palatino, 'Palatino Linotype', serif;
		font-size: 1.05rem;
		letter-spacing: 0.08em;
		cursor: pointer;
	}

	button:hover {
		background: #34d399;
		border-color: #34d399;
	}

	ul {
		display: grid;
		gap: 0.35rem;
		margin: 1.5rem 0 0;
		padding: 0;
		list-style: none;
		font-family: ui-monospace, Menlo, Consolas, monospace;
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #cbb79a;
	}

	kbd {
		display: inline-block;
		padding: 0.1rem 0.35rem;
		border: 1px solid #6d5228;
		color: #f0d9a4;
	}

	.hud {
		position: fixed;
		inset: 0;
		z-index: 3;
		pointer-events: none;
	}

	.cross {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 8px;
		height: 8px;
		border: 1px solid rgba(240, 217, 164, 0.7);
		transform: translate(-50%, -50%) rotate(45deg);
	}

	.now {
		position: absolute;
		bottom: 1.6rem;
		left: 0;
		right: 0;
		text-align: center;
		font-family: Palatino, 'Palatino Linotype', serif;
		font-size: 1.05rem;
		color: #f6ead8;
		text-shadow: 0 1px 8px #140e0a;
	}

	.now.quiet {
		font-family: ui-monospace, Menlo, Consolas, monospace;
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #cbb79a;
	}
</style>
