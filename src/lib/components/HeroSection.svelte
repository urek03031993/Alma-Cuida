<script lang="ts">
	import { onMount } from 'svelte';

	let loaded = $state(false);

	onMount(() => {
		setTimeout(() => (loaded = true), 100);
	});

	const stats = [
		{ number: '15+', label: 'Anos de experiencia' },
		{ number: '200+', label: 'Familias felices' },
		{ number: '24/7', label: 'Atencion medica' }
	];
</script>

<section id="inicio" class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<!-- Background Image with Overlay -->
	<div class="absolute inset-0 hero-bg">
		<div class="absolute inset-0 bg-linear-to-b from-cream/30 via-cream/20 to-cream/90"></div>
		<div class="absolute inset-0 bg-linear-to-r from-cream/60 via-transparent to-cream/40"></div>
	</div>

	<!-- Decorative floating elements -->
	<div
		class="absolute top-32 left-10 w-20 h-20 rounded-full bg-sage/10 floating hidden lg:block"
	></div>
	<div
		class="absolute bottom-40 right-20 w-16 h-16 rounded-full bg-beige/60 floating-delay hidden lg:block"
	></div>
	<div
		class="absolute top-1/2 right-1/4 w-12 h-12 rounded-full bg-sage/15 floating-delay-2 hidden lg:block"
	></div>

	<!-- Content -->
	<div class="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center pt-20">
		<div
			class="transition-all duration-1000 {loaded
				? 'opacity-100 translate-y-0'
				: 'opacity-0 translate-y-8'}"
		>
			<span
				class="inline-block px-5 py-2 glass rounded-full text-xs font-semibold text-sage-dark tracking-widest uppercase mb-8"
			>
				Residencia Premium para Adultos Mayores
			</span>
		</div>

		<h1
			class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-darkgray leading-tight mb-6 transition-all duration-1000 delay-100 {loaded
				? 'opacity-100 translate-y-0'
				: 'opacity-0 translate-y-8'}"
		>
			Cuidado profesional con el
			<span class="relative inline-block">
				<span class="relative z-10">calor de un hogar</span>
				<span class="absolute bottom-2 left-0 right-0 h-3 bg-sage/20 -rotate-1 rounded-sm"></span>
			</span>
			.
		</h1>

		<p
			class="text-lg md:text-xl text-darkgray/70 max-w-3xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-200 {loaded
				? 'opacity-100 translate-y-0'
				: 'opacity-0 translate-y-8'}"
		>
			Un entorno premium donde nuestro equipo de profesionales se dedica a brindar bienestar,
			seguridad y acompanamiento constante a quienes mas amas.
		</p>

		<div
			class="flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-300 {loaded
				? 'opacity-100 translate-y-0'
				: 'opacity-0 translate-y-8'}"
		>
			<a
				href="#cuidado"
				class="btn-shine group px-8 py-4 bg-sage text-white font-semibold rounded-full hover:bg-sage-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
			>
				Conoce a nuestro equipo
				<svg
					class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 8l4 4m0 0l-4 4m4-4H3"
					/>
				</svg>
			</a>
			<a
				href="#contacto"
				class="px-8 py-4 border-2 border-darkgray/20 text-darkgray font-semibold rounded-full hover:border-sage hover:text-sage transition-all duration-300 hover:-translate-y-0.5"
			>
				Contactar
			</a>
		</div>

		<!-- Stats -->
		<div
			class="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-1000 delay-500 {loaded
				? 'opacity-100 translate-y-0'
				: 'opacity-0 translate-y-8'}"
		>
			{#each stats as stat(stat.label)}
				<div class="text-center">
					<div class="text-2xl md:text-3xl font-bold text-sage">{stat.number}</div>
					<div class="text-xs md:text-sm text-darkgray/60 mt-1">{stat.label}</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
		<svg class="w-6 h-6 text-darkgray/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M19 14l-7 7m0 0l-7-7m7 7V3"
			/>
		</svg>
	</div>
</section>
