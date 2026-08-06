<script lang="ts">
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main class="pt-32 pb-24 bg-cream">
    <header class="px-margin-desktop max-w-container-max mx-auto mb-20 text-center relative">
		<div class="inline-block px-4 py-1.5 bg-sage text-white rounded-full font-label-md text-label-md mb-6 tracking-wider uppercase">
			Cuidado y bienestar integral
		</div>
		<h1 class="font-headline-xl text-headline-xl text-sage-dark mb-6 max-w-3xl mx-auto">			
			Apoyo delicado para una vida radiante.
		</h1>
		<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
			Descubra toda nuestra gama de servicios de atención personalizada, diseñados para brindar bienestar, seguridad y acompañamiento constante.
		</p>
	</header>

	<section class="px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
		{#each data.data as service, index(service.id)}
			<ServiceCard
				id={service.id}
				image={service.image.url}
				title={service.name}
				description={service.description}
				delay={index * 150}
			/>
		{/each}
	</section>

	<section class="px-margin-desktop max-w-container-max mx-auto mt-24">
		<div class="bg-sage p-12 md:p-16 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-12 shadow-xl relative overflow-hidden">
			<div class="relative z-10">
				<h2 class="font-headline-lg text-headline-lg text-on-primary mb-4">
					Experimente el estilo de Alma Cuida.
				</h2>
				<p class="text-on-primary/80 font-body-md max-w-xl">
					Contactenos y conozca nuestros servicios y al equipo de atención especializado para ver cómo
					podemos adaptar nuestros servicios a las necesidades de su familia.
				</p>
			</div>
			<div class="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
				<a href={resolve('/(app)/contact')} class="bg-white text-black px-8 py-3.5 rounded-full font-label-md text-label-md hover:bg-beige transition-all shadow-lg whitespace-nowrap">
					Contactenos
				</a>				
			</div>
			<div class="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
		</div>
	</section>
</main>
