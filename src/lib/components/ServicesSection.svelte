<script lang="ts">
	import { browser } from '$app/environment';
	import ServiceSectionCard from './ServiceSectionCard.svelte';
	import Image1 from '$lib/assets/services_image_1.webp'
	import Image2 from '$lib/assets/services_image_2.webp'
	import Image3 from '$lib/assets/services_image_3.webp'


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
			image: Image1,
			title: 'Cuidadoras',
			description:
				'Cuidados residenciales especializados para adultos mayores. Nuestros profesionales capacitados realizan higiene personal, administración de medicación bajo indicaciones, asistencia en la movilidad y acompañamiento emocional. Trabajamos en coordinación con la familia y el equipo de salud, actuando con respeto, paciencia y máxima discreción para preservar la dignidad y el bienestar del usuario.'
		},
		{
			image: Image3,
			title: 'Acompañantes',
			description:
				'Atención presencial para adultos mayores, personas con discapacidad y quienes están en proceso de recuperación. Fomentamos la autonomía y ayuda,  ofrecemos compañía activa y supervisión según las necesidades de cada persona. Nuestro enfoque es crear un entorno seguro, cálido y respetuoso que mejore la calidad de vida.'
		},
		{
			image: Image2,
			title: 'Transportes',
			description:
				'Servicio especializado para personas con movilidad reducida y adultos mayores. Con asistencia al subir y bajar del vehículo, traslados seguros a consultas médicas, trámites y actividades sociales, y coordinamos horarios con familias y centros de salud. Prioramos la seguridad, la puntualidad y un trato atento durante todo el recorrido.'
		}
	];
</script>

<section id="servicios" bind:this={sectionRef} class="py-24 md:py-32 relative">
	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
		<div class="text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
			<span class="inline-block px-4 py-1.5 bg-beige/70 rounded-full text-xs font-semibold text-sage-dark tracking-widest uppercase mb-6">
				Nuestros Servicios
			</span>
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-darkgray mb-6 leading-tight">
				Cuidado y Acompañamiento
			</h2>
			<p class="text-darkgray/60 text-lg leading-relaxed">
				Cada detalle esta pensado para ofrecer una experiencia de vida plena, segura y llena de
				momentos significativos.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
			{#each services as service, index(service.title)}
				<ServiceSectionCard
					image={service.image}
					title={service.title}
					description={service.description}
					delay={index * 150}
				/>
			{/each}
		</div>
	</div>
</section>
