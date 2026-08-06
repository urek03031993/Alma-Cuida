<script lang="ts">
	import { browser } from '$app/environment';
	import { resolve } from '$app/paths';
	import Logo from './Logo.svelte';

	interface Props {
		id: number;
		image: string;
		title: string;
		description: string;
		delay: number;
	}

	let { id, image, title, description, delay }: Props = $props();

	let cardRef: HTMLElement;
	let isVisible = $state(false);

	$effect(() => {
		if (!browser || !cardRef) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isVisible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.2 }
		);
		observer.observe(cardRef);
		return () => observer.disconnect();
	});
</script>

<article bind:this={cardRef} 
		class="glass-card rounded-xl overflow-hidden flex flex-col h-full group {isVisible
		? 'opacity-100 translate-y-0'
		: 'opacity-0 translate-y-12'}"
		 style="transition-delay: {delay}ms">
	<div class="h-64 overflow-hidden">
		<img
			alt={title}
			class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
			src={image}
			loading="lazy"
		/>
	</div>
	<div class="p-8 flex flex-col grow">
		<div class="flex items-center gap-3 mb-4">					
			<div class="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center mb-3 shadow-lg">
				<Logo/>
			</div>
			<h3 class="font-headline-md text-headline-md text-on-surface">{title}</h3>
		</div>
		<p class="text-on-surface-variant mb-8 grow">
			{description}
		</p>

		<div class="mt-6 flex items-center gap-2 text-sage font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-2.5 group-hover:translate-x-0"> 
		<a href={resolve(`/services/${id.toString()}`)} class="flex items-center gap-2">
			<span>Saber mas</span>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M17 8l4 4m0 0l-4 4m4-4H3"
				/>
			</svg>
		</a>			
	</div>				
	</div>
	
</article>

<style>
    .glass-card {
        background: rgba(232, 223, 200, 0.6);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .glass-card:hover {
        transform: translateY(-8px) perspective(1000px) rotateX(2deg) rotateY(1deg);
        box-shadow: 0 20px 40px rgba(122, 158, 126, 0.15);
    }
</style>
