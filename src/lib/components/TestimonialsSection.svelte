<script lang="ts">
	import { browser } from '$app/environment';

	let sectionRef: HTMLElement;
	let isVisible = $state(false);

	$effect(() => {
		if (!browser || !sectionRef) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isVisible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);
		observer.observe(sectionRef);
		return () => observer.disconnect();
	});

	const testimonials = [
		{
			quote:
				'Desde que mi madre llego a Alma Cuida, he visto una transformacion increible. El equipo no solo cuida de ella, la hace sentir verdaderamente amada.',
			author: 'Maria Gonzalez',
			role: 'Hija de residente',
			image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80'
		},
		{
			quote:
				'La atencion medica es excepcional. Me siento seguro sabiendo que hay profesionales disponibles las 24 horas. Aqui encontre una segunda familia.',
			author: 'Roberto Mendez',
			role: 'Residente desde 2021',
			image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
		},
		{
			quote:
				'El ambiente es calido y las instalaciones son hermosas. Mi padre disfruta cada dia las actividades y la compania. No podriamos estar mas agradecidos.',
			author: 'Carlos Herrera',
			role: 'Hijo de residente',
			image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80'
		}
	];
</script>

<section bind:this={sectionRef} class="py-24 md:py-32 relative">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div
			class="text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 {isVisible
				? 'opacity-100 translate-y-0'
				: 'opacity-0 translate-y-8'}"
		>
			<span
				class="inline-block px-4 py-1.5 bg-beige/70 rounded-full text-xs font-semibold text-sage-dark tracking-widest uppercase mb-6"
			>
				Testimonios
			</span>
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-darkgray mb-6">
				Historias de confianza
			</h2>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			{#each testimonials as t, i(t.author)}
				<div
					class="glass-card rounded-3xl p-8 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 {isVisible
						? 'opacity-100 translate-y-0'
						: 'opacity-0 translate-y-12'}"
					style="transition-delay: {i * 150}ms"
				>
					<svg class="w-10 h-10 text-sage/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
						/>
					</svg>
					<p class="text-darkgray/80 leading-relaxed mb-6 italic">
						"{t.quote}"
					</p>
					<div class="flex items-center gap-4">
						<img
							src={t.image}
							alt={t.author}
							class="w-12 h-12 rounded-full object-cover ring-2 ring-sage/20"
						/>
						<div>
							<div class="font-semibold text-darkgray">{t.author}</div>
							<div class="text-sm text-darkgray/50">{t.role}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
