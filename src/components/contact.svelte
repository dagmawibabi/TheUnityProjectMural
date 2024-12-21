<script lang="ts">
	import { Instagram, Linkedin, Twitter, Mail, Send } from 'lucide-svelte';
</script>

<div class="mx-auto w-[60%] pb-24 pt-48 text-white">
	<div class="pb-8 text-center">
		<span class="mx-auto text-2xl font-bold text-emerald-500"> Contact </span>
	</div>

	<div class="flex items-center justify-center gap-x-5">
		<Send class="cursor-pointer hover:scale-125" />
		<Instagram class="cursor-pointer hover:scale-125" />
		<Twitter class="cursor-pointer hover:scale-125" />
		<Linkedin class="cursor-pointer hover:scale-125" />
		<Mail class="cursor-pointer hover:scale-125" />
	</div>
</div>
