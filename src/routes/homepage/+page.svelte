<script lang="ts">
	import Header from '../../components/header.svelte';
	// import Rounds from '../../components/rounds.svelte';
	import ArtGrids from '../../components/art_grids.svelte';
	import ControlsAndInfo from '../../components/controls_and_info.svelte';
	import Footer from '../../components/footer.svelte';
	import Contribute from '../../components/contribute.svelte';
	import Contact from '../../components/contact.svelte';
	import Quote from '../../components/quote.svelte';
</script>

<div class="h-screen w-screen overflow-scroll">
	<!-- INTRO -->
	<Header />

	<!-- Visitor Count & SIZE CONTROL -->
	<ControlsAndInfo />

	<!-- ART GRIDS -->
	<ArtGrids />

	<!-- CONTRIBUTE -->
	<Contribute />

	<!-- CONTACT -->
	<Contact />

	<!-- QUOTE -->
	<Quote />

	<!-- Footer -->
	<Footer />
</div>
