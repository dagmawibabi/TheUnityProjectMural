<script lang="ts">
	import { Instagram, Linkedin, Twitter, Mail, Send, Github } from 'lucide-svelte';
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
		<a href="https://t.me/dagmawibabi" target="_blank" rel="noreferrer">
			<Send class="cursor-pointer text-emerald-500 hover:scale-125" size={28} />
		</a>
		<a href="https://instagram.com/dagmawibabi" target="_blank" rel="noreferrer">
			<Instagram class="cursor-pointer text-emerald-500 hover:scale-125" size={28} />
		</a>
		<a href="https://x.com/dagmawibabi" target="_blank" rel="noreferrer">
			<Twitter class="cursor-pointer text-emerald-500 hover:scale-125" size={28} />
		</a>
		<a href="https://linkedin.com/in/dagmawibabi" target="_blank" rel="noreferrer">
			<Linkedin class="cursor-pointer text-emerald-500 hover:scale-125" size={28} />
		</a>
		<a href="https://github.com/dagmawibabi/art" target="_blank" rel="noreferrer">
			<Github class="cursor-pointer text-emerald-500 hover:scale-125" size={28} />
		</a>
		<a href="mailto:1babidagi@gmail.com" target="_blank" rel="noreferrer">
			<Mail class="cursor-pointer text-emerald-500 hover:scale-125" size={28} />
		</a>
	</div>
</div>
