<script lang="ts">
	import { browser } from '$app/environment';
	import ServiceCard from './ServiceCard.svelte';
	import Image1 from '$lib/assets/services_image_1.jpeg'

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

	const services = [
		{
			image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80',
			title: 'Asistencia Medica 24/7',
			description:
				'Personal de salud altamente capacitado disponible en todo momento para garantizar la tranquilidad de los residentes.'
		},
		{
			image: Image1,
			title: 'Cuidado Personalizado',
			description:
				'Atencion adaptada a las necesidades fisicas y emocionales de cada persona, promoviendo su independencia.'
		},
		{
			image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80',
			title: 'Acompanamiento y Empatia',
			description:
				'Mas que cuidadores, formamos vinculos. Fomentamos la sociabilidad y el bienestar emocional de cada residente.'
		}
	];
</script>

<section id="cuidado" bind:this={sectionRef} class="py-24 md:py-32 relative">
	<!-- Background decoration -->
	<div
		class="absolute top-0 left-0 w-72 h-72 bg-beige/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
	></div>
	<div
		class="absolute bottom-0 right-0 w-96 h-96 bg-sage/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"
	></div>

	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
		<!-- Section Header -->
		<div
			class="text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 {isVisible
				? 'opacity-100 translate-y-0'
				: 'opacity-0 translate-y-8'}"
		>
			<span
				class="inline-block px-4 py-1.5 bg-beige/70 rounded-full text-xs font-semibold text-sage-dark tracking-widest uppercase mb-6"
			>
				Nuestro Cuidado
			</span>
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-darkgray mb-6 leading-tight">
				Cuidado y Acompanamiento
			</h2>
			<p class="text-darkgray/60 text-lg leading-relaxed">
				Cada detalle esta pensado para ofrecer una experiencia de vida plena, segura y llena de
				momentos significativos.
			</p>
		</div>

		<!-- Cards Grid -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
			{#each services as service, index(service.title)}
				<ServiceCard
					image={service.image}
					title={service.title}
					description={service.description}
					delay={index * 150}
				/>
			{/each}
		</div>
	</div>
</section>
