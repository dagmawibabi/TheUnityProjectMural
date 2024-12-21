<script lang="ts">
	import { Instagram, Linkedin, Twitter, Mail, Send } from 'lucide-svelte';
</script>

<div class="mx-auto w-[60%] pb-24 pt-48 text-white">
	<div class="pb-8 text-center">
		<span
			class="mx-auto text-2xl font-bold text-emerald-500 md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl"
		>
			Contact
		</span>
	</div>

	<div class="flex items-center justify-center gap-x-6">
		<Send class="cursor-pointer text-emerald-500 hover:scale-125" size={28} />
		<Instagram class="cursor-pointer text-emerald-500 hover:scale-125" size={28} />
		<Twitter class="cursor-pointer text-emerald-500 hover:scale-125" size={28} />
		<Linkedin class="cursor-pointer text-emerald-500 hover:scale-125" size={28} />
		<Mail class="cursor-pointer text-emerald-500 hover:scale-125" size={28} />
	</div>
</div>
