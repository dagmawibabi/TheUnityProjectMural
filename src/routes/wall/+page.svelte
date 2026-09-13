<script lang="ts">
	import { onMount } from 'svelte';
	import WallTile from '../../components/wall_tile.svelte';
	import { getAllArtwork } from '$lib/artwork';

	const catalog = $derived(getAllArtwork());

	let rootEl: HTMLDivElement | undefined = $state();
	let trackEl: HTMLDivElement | undefined = $state();
	let unitEl: HTMLDivElement | undefined = $state();
	let vw = $state(1280);
	let vh = $state(800);
	let reducedMotion = $state(false);

	onMount(() => {
		const html = document.documentElement;
		const body = document.body;
		const prevHtml = html.style.overflow;
		const prevBody = body.style.overflow;
		html.style.overflow = 'hidden';
		body.style.overflow = 'hidden';

		const sync = () => {
			if (!rootEl) return;
			vw = rootEl.clientWidth;
			vh = rootEl.clientHeight;
		};
		sync();
		const ro = new ResizeObserver(sync);
		if (rootEl) ro.observe(rootEl);

		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = media.matches;
		const onMotion = () => (reducedMotion = media.matches);
		media.addEventListener('change', onMotion);

		let offset = 0;
		let last = performance.now();
		let frame = 0;
		let dragging = false;
		let dragY = 0;
		let dragDistance = 0;
		let userControlUntil = 0;
		const speed = 42;

		const loopHeight = () => unitEl?.offsetHeight ?? 0;

		const wrap = (value: number) => {
			const height = loopHeight();
			if (height <= 1) return 0;
			let next = value % height;
			if (next < 0) next += height;
			return next;
		};

		const paint = () => {
			offset = wrap(offset);
			if (trackEl) trackEl.style.transform = `translate3d(0, ${-offset}px, 0)`;
		};

		const markUser = () => {
			userControlUntil = performance.now() + 900;
		};

		const onWheel = (event: WheelEvent) => {
			event.preventDefault();
			offset += event.deltaY;
			markUser();
			paint();
		};

		const onPointerDown = (event: PointerEvent) => {
			if (event.button !== 0) return;
			dragging = true;
			dragY = event.clientY;
			dragDistance = 0;
			rootEl?.setPointerCapture(event.pointerId);
		};

		const onPointerMove = (event: PointerEvent) => {
			if (!dragging) return;
			const dy = event.clientY - dragY;
			dragDistance += Math.abs(dy);
			offset -= dy;
			dragY = event.clientY;
			markUser();
			paint();
		};

		const onClickCapture = (event: MouseEvent) => {
			if (dragDistance > 8) {
				event.preventDefault();
				event.stopPropagation();
			}
		};

		const onPointerUp = (event: PointerEvent) => {
			dragging = false;
			try {
				rootEl?.releasePointerCapture(event.pointerId);
			} catch {
				// already released
			}
		};

		const onKeyDown = (event: KeyboardEvent) => {
			const height = loopHeight() || vh;
			if (event.key === 'ArrowDown' || event.key === 'PageDown') {
				event.preventDefault();
				offset += event.key === 'PageDown' ? height * 0.85 : 80;
				markUser();
				paint();
			} else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
				event.preventDefault();
				offset -= event.key === 'PageUp' ? height * 0.85 : 80;
				markUser();
				paint();
			} else if (event.key === 'Home') {
				event.preventDefault();
				offset = 0;
				markUser();
				paint();
			}
		};

		const tick = (now: number) => {
			const dt = Math.min(0.05, (now - last) / 1000);
			last = now;
			const height = loopHeight();
			const userScrolling = now < userControlUntil || dragging;
			if (!reducedMotion && !userScrolling && trackEl && height > 1) {
				offset += speed * dt;
			}
			paint();
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);

		rootEl?.addEventListener('wheel', onWheel, { passive: false });
		rootEl?.addEventListener('pointerdown', onPointerDown);
		rootEl?.addEventListener('pointermove', onPointerMove);
		rootEl?.addEventListener('pointerup', onPointerUp);
		rootEl?.addEventListener('pointercancel', onPointerUp);
		rootEl?.addEventListener('click', onClickCapture, true);
		window.addEventListener('keydown', onKeyDown);

		return () => {
			cancelAnimationFrame(frame);
			ro.disconnect();
			media.removeEventListener('change', onMotion);
			rootEl?.removeEventListener('wheel', onWheel);
			rootEl?.removeEventListener('pointerdown', onPointerDown);
			rootEl?.removeEventListener('pointermove', onPointerMove);
			rootEl?.removeEventListener('pointerup', onPointerUp);
			rootEl?.removeEventListener('pointercancel', onPointerUp);
			rootEl?.removeEventListener('click', onClickCapture, true);
			window.removeEventListener('keydown', onKeyDown);
			html.style.overflow = prevHtml;
			body.style.overflow = prevBody;
		};
	});

	const cols = $derived(vw < 640 ? 3 : vw < 768 ? 4 : vw < 1024 ? 5 : vw < 1280 ? 6 : 8);
	const cell = $derived(vw > 0 ? vw / cols : 160);
	const rows = $derived.by(() => {
		const viewportRows = Math.max(4, Math.ceil(vh / cell));
		const catalogRows = Math.max(1, Math.ceil(catalog.length / cols));
		return Math.max(viewportRows, catalogRows);
	});
	const unit = $derived.by(() => {
		if (catalog.length === 0) return [];
		return Array.from({ length: cols * rows }, (_, i) => catalog[i % catalog.length]);
	});
	const unitHeight = $derived(rows * cell);
</script>

<svelte:head>
	<title>Wall — The Unity Project Mural</title>
</svelte:head>

<div bind:this={rootEl} class="wall-root">
	<a href="/" aria-label="Back to the mural" class="home-link">Home</a>

	{#if catalog.length === 0}
		<p class="empty">No artwork on the wall yet.</p>
	{:else}
		<div
			bind:this={trackEl}
			class="track"
			role="region"
			aria-label="Endless mural wall"
		>
			<div class="unit" bind:this={unitEl} style="--cols: {cols}; --rows: {rows}; height: {unitHeight}px;">
				{#each unit as art, i (`a-${i}`)}
					<WallTile {art} />
				{/each}
			</div>
			<div
				class="unit"
				inert
				aria-hidden="true"
				style="--cols: {cols}; --rows: {rows}; height: {unitHeight}px;"
			>
				{#each unit as art, i (`b-${i}`)}
					<WallTile {art} />
				{/each}
			</div>
			<div
				class="unit"
				inert
				aria-hidden="true"
				style="--cols: {cols}; --rows: {rows}; height: {unitHeight}px;"
			>
				{#each unit as art, i (`c-${i}`)}
					<WallTile {art} />
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.wall-root {
		position: fixed;
		inset: 0;
		overflow: hidden;
		background: #09090b;
		color: #fff;
		touch-action: none;
	}

	.track {
		will-change: transform;
	}

	.unit {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
		grid-template-rows: repeat(var(--rows), minmax(0, 1fr));
	}

	.empty {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		font-family: ui-monospace, monospace;
		font-size: 0.875rem;
		color: #71717a;
	}

	.home-link {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 20;
		display: flex;
		height: 3rem;
		width: 3rem;
		align-items: center;
		justify-content: center;
		font-family: ui-monospace, monospace;
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #34d399;
		opacity: 0;
		transition: opacity 200ms ease;
	}

	.home-link:hover,
	.home-link:focus-visible {
		opacity: 1;
		background: rgb(9 9 11 / 0.8);
	}
</style>
