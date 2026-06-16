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

	const facilities = [
		{
			title: 'Habitaciones Premium',
			desc: 'Espacios amplios, luminosos y adaptados con banos privados, climatizacion y vistas al jardin.',
			iconPath:
				'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
		},
		{
			title: 'Sala de Terapia Fisica',
			desc: 'Equipamiento moderno para rehabilitacion y mantenimiento de la movilidad y fuerza.',
			iconPath:
				'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
		},
		{
			title: 'Biblioteca y Salon Social',
			desc: 'Espacios para lectura, juegos de mesa, talleres y encuentros que enriquecen la vida diaria.',
			iconPath:
				'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
		},
		{
			title: 'Jardines Terapeuticos',
			desc: 'Amplias zonas verdes disenadas para paseos seguros, horticultura y contacto con la naturaleza.',
			iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
		}
	];
</script>

<section
	id="instalaciones"
	bind:this={sectionRef}
	class="py-24 md:py-32 bg-beige-light/30 relative overflow-hidden"
>
	<div class="absolute top-20 right-0 w-64 h-64 bg-sage/5 rounded-full blur-3xl"></div>

	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-16 items-center">
			<!-- Image Side -->
			<div class="relative transition-all duration-1000 {isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}">
				<div class="relative rounded-3xl overflow-hidden shadow-2xl">
					<img
						src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=80"
						alt="Instalaciones premium"
						class="w-full h-125 object-cover"
						loading="lazy"
					/>
					<div class="absolute inset-0 bg-linear-to-t from-darkgray/30 to-transparent"></div>
				</div>
				<!-- Floating badge -->
				<div class="absolute -bottom-6 -right-6 glass-card rounded-2xl p-6 shadow-xl max-w-xs hidden md:block">
					<div class="flex items-center gap-4">
						<div class="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center">
							<svg class="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<div>
							<div class="font-bold text-darkgray">Certificacion</div>
							<div class="text-sm text-darkgray/60">ISO 9001 en calidad</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Content Side -->
			<div class="transition-all duration-1000 delay-200 {isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}">
				<span class="inline-block px-4 py-1.5 bg-beige/70 rounded-full text-xs font-semibold text-sage-dark tracking-widest uppercase mb-6">
					Instalaciones
				</span>
				<h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-darkgray mb-6 leading-tight">
					Un hogar disenado para el bienestar
				</h2>
				<p class="text-darkgray/60 text-lg leading-relaxed mb-10">
					Nuestras instalaciones combinan elegancia y funcionalidad, creando espacios que inspiran
					tranquilidad, seguridad y comodidad en cada rincon.
				</p>

				<div class="grid sm:grid-cols-2 gap-6">
					{#each facilities as facility(facility.title)}
						<div class="group p-5 rounded-2xl bg-white/60 hover:bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
							<div class="text-sage mb-3 group-hover:scale-110 transition-transform duration-300">
								<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d={facility.iconPath}
									/>
								</svg>
							</div>
							<h4 class="font-semibold text-darkgray mb-1">{facility.title}</h4>
							<p class="text-sm text-darkgray/60 leading-relaxed">{facility.desc}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
