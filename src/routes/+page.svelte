<script lang="ts">
	import Header from '../components/header.svelte';
	import Rounds from '../components/rounds.svelte';
	import ArtGrids from '../components/art_grids.svelte';
	import ControlsAndInfo from '../components/controls_and_info.svelte';
	import Footer from '../components/footer.svelte';
	import Contribute from '../components/contribute.svelte';
	import Contact from '../components/contact.svelte';
	import Quote from '../components/quote.svelte';
</script>

<div
	class="absolute inset-0 -z-10 h-full w-full bg-zinc-950 bg-[linear-gradient(to_right,#5050500a_1px,transparent_1px),linear-gradient(to_bottom,#5050500a_1px,transparent_1px)] bg-[size:6rem_4rem]"
>
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
</div>
