<script>
	import EachStep from './each_step.svelte';

	let reservationSteps = [
		'Check the group for the pinned messages to see if the spot you chose is reserved or not. If the spot is reserved, pick another spot and recheck.',
		'If the spot is not reserved, quickly text the group in the following format: John Doe @InstagramUsername Spot:12 Time:1 Day',
		'Time to complete an art piece should be between a minimum of 6 hours to a maximum of 2 days. If you need more time, please let us know in advance.',
		"If you don't deliver by the timeframe you chose, your spot will be given to someone else. So, please be mindful of the time."
	];

	let artPieceGuides = [
		'The dimension for your drawing should be any square with a minimum of 500x500 pixels.',
		'Draw your art piece in a way it connects to the arts beside the spot you chose while also drawing in a way that lets others continue off from your drawing on all sides.',
		'When you finish drawing, send the uncompressed and high-quality PNG format in the group.',
		'The project organizers will then upload your drawing to the website and host it for the world to admire!'
	];
</script>

<div
	class="mx-auto w-full px-2 pb-10 pt-36 text-white md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[60%]"
>
	<div class="pb-4 text-center md:pb-8 lg:pb-8 xl:pb-8 2xl:pb-8">
		<span
			class="mx-auto text-2xl font-bold text-emerald-500 md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl"
		>
			Contribute
		</span>
	</div>

	<div
		class="text-center font-mono text-sm italic text-zinc-400 md:text-base lg:text-base xl:text-base 2xl:text-base"
	>
		<p>
			If you are a digital artist wanting to contribute to this collection of connected art pieces,
			follow the steps below accordingly and your art will be hosted here in no time!
		</p>

		<div class="pb-2 pt-10 text-lg font-semibold text-emerald-500">Reservation Guide</div>
		<div>
			<div class="mx-auto h-7 w-1 border-l border-dotted border-zinc-700"></div>
			<div class="mx-auto w-3/4 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-3">
				Join <a href="https://t.me/TheUnityProjectMuralGroup" target="_blank" class="text-blue-500"
					>@TheUnityProjectMuralGroup</a
				> on Telegram.
			</div>
		</div>
		{#each reservationSteps as step}
			<EachStep {step} />
		{/each}

		<div class="pb-2 pt-10 text-lg font-semibold text-emerald-500">Art Piece Guide</div>
		{#each artPieceGuides as step}
			<EachStep {step} />
		{/each}

		<div class="pb-2 pt-10 text-lg font-semibold text-emerald-500">
			We'd be honored to have your work!
		</div>
	</div>
</div>
