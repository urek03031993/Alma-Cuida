<script lang="ts">
	import { browser } from '$app/environment';

	interface Props {
		image: string;
		title: string;
		description: string;
		delay: number;
	}

	let { image, title, description, delay }: Props = $props();

	let cardRef: HTMLDivElement;
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

<div
	bind:this={cardRef}
	class="card-3d glass-card rounded-3xl overflow-hidden group cursor-pointer transition-all duration-700 {isVisible
		? 'opacity-100 translate-y-0'
		: 'opacity-0 translate-y-12'}"
	style="transition-delay: {delay}ms"
>
	<!-- Image -->
	<div class="relative h-64 overflow-hidden">
		<img
			src={image}
			alt={title}
			class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
			loading="lazy"
		/>
		<div class="absolute inset-0 image-overlay"></div>
		<div class="absolute bottom-4 left-4 right-4">
			<div
				class="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center mb-3 shadow-lg"
			>
				<svg class="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
					/>
				</svg>
			</div>
		</div>
	</div>

	<!-- Content -->
	<div class="p-8">
		<h3
			class="text-xl font-bold text-darkgray mb-3 group-hover:text-sage transition-colors duration-300"
		>
			{title}
		</h3>
		<p class="text-darkgray/70 leading-relaxed text-sm">
			{description}
		</p>
		<div
			class="mt-6 flex items-center gap-2 text-sage font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-2.5 group-hover:translate-x-0"
		>
			<span>Saber mas</span>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M17 8l4 4m0 0l-4 4m4-4H3"
				/>
			</svg>
		</div>
	</div>
</div>
