<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { scrollY } from 'svelte/reactivity/window';

	let scrolled = $state(false);
	let mobileOpen = $state(false);

	const navLinks = [
		{ label: 'Inicio', href: resolve('/') },
		{ label: 'Nuestros Servicios', href: resolve('/services') },
		{ label: 'Instalaciones', href: resolve('/') },
		{ label: 'Contacto', href: resolve('/contact') }
	];

	$effect(() => {
		if (scrollY.current !== undefined && scrollY.current > 30) {
			scrolled = true;
		} else {
			scrolled = false;
		}
	});
</script>


<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 {scrolled ? 'glass-nav shadow-lg' : 'bg-transparent'}">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div class="flex items-center justify-between h-20">
			<a href="#inicio" class="flex items-center gap-3 group">
				<div class="w-10 h-10 rounded-full bg-sage flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
					<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
				</div>
				<span class="text-xl font-semibold text-darkgray tracking-tight">Alma Cuida</span>
			</a>

			<div class="hidden md:flex items-center gap-10">
				{#each navLinks as link (link.label)}
					<a	href={link.href}
						aria-current={page.url.pathname === link.href}
						class="nav-link text-sm font-medium text-darkgray/80 hover:text-darkgray transition-colors duration-300 tracking-wide"
					>
						{link.label}
					</a>
				{/each}
				<a	href="#contacto"
					class="btn-shine px-6 py-2.5 bg-sage text-white text-sm font-medium rounded-full hover:bg-sage-dark transition-all duration-300 shadow-md hover:shadow-lg"
				>
					Reservar Visita
				</a>
			</div>

			<!-- Mobile Menu Button -->
			<button	onclick={() => (mobileOpen = !mobileOpen)} class="md:hidden p-2 rounded-lg hover:bg-beige/50 transition-colors"
					aria-label="Toggle menu"
			>
				<svg class="w-6 h-6 text-darkgray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if mobileOpen}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					{:else}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					{/if}
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	<div
		class="md:hidden overflow-hidden transition-all duration-500 {mobileOpen
			? 'max-h-80 opacity-100'
			: 'max-h-0 opacity-0'}"
	>
		<div class="glass-nav px-6 pb-6 pt-2 space-y-4">
			{#each navLinks as link (link.label)}
				<a	href={link.href}
					onclick={() => (mobileOpen = false)}
					class="block text-darkgray/80 hover:text-darkgray font-medium py-2 transition-colors"
				>
					{link.label}
				</a>
			{/each}
			<a	href="#contacto"
				onclick={() => (mobileOpen = false)}
				class="block w-full text-center px-6 py-3 bg-sage text-white font-medium rounded-full hover:bg-sage-dark transition-colors"
			>
				Reservar Visita
			</a>
		</div>
	</div>
</nav>

<style>
	nav a[aria-current=true] {
		border-bottom: 2px solid;
		border-color: #7a9e7e;
	}
</style>