<script lang="ts">
	let { showPragraph } = $props();
</script>

<div
	class={showPragraph == false
		? 'w-fill mx-auto border-b border-dashed border-emerald-800 px-2 pb-0 pt-6 md:w-[60%] md:pt-10 lg:w-[60%] lg:border-none lg:pb-16 lg:pt-10 xl:w-[60%] xl:border-none xl:pb-16 xl:pt-10 2xl:w-[60%] 2xl:border-none 2xl:pb-16 2xl:pt-10'
		: 'w-fill mx-auto px-2 pb-16 pt-6 md:w-[60%] md:pt-10 lg:w-[60%] lg:pt-10 xl:w-[60%] xl:pt-10 2xl:w-[60%] 2xl:pt-10'}
>
	<div class="pb-4 text-center md:pb-8 lg:pb-8 xl:pb-8 2xl:pb-8">
		<a href="/">
			<span
				class="text-2xl font-bold text-emerald-500
		 md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl
		"
			>
				The Unity Project Mural
			</span>
		</a>
	</div>

	<p
		class={showPragraph == false
			? 'hidden text-center font-mono text-sm italic text-zinc-400 md:text-base lg:flex lg:text-base xl:flex xl:text-base 2xl:flex 2xl:text-base'
			: 'text-center font-mono text-sm italic text-zinc-400 md:text-base lg:text-base xl:text-base 2xl:text-base'}
	>
		The Unity Project Mural is a diverse and collaborative art initiative, inviting people to
		contribute their artistic expressions in a way that interlinks with surrounding artworks. This
		interconnectedness narrates the story of human relationships, illustrating how we are all
		intertwined and connected through various facets of life. The artwork featured in this project
		stems from a vibrant and diverse global creative community, showcasing rich and complex art
		styles and concepts.
	</p>
</div>
