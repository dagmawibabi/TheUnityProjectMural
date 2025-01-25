<script lang="ts">
	import ArtistContributionArt from './artist_contribution_art.svelte';
	import ArtistContributionThemeTitle from './artist_contribution_theme_title.svelte';
	let { theme, contributions, artistUsername } = $props();
</script>

<div>
	<ArtistContributionThemeTitle title={theme} length={contributions.length} />
	<div
		class="mx-auto grid w-fit grid-cols-1 grid-rows-none gap-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3"
	>
		{#each contributions as art}
			{#if art.link == artistUsername}
				<ArtistContributionArt {art} />
			{/if}
		{/each}
	</div>
</div>
