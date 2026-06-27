<script lang="ts">
	import { browser } from '$app/environment';

	let sectionRef: HTMLElement;
	let isVisible = $state(false);
	let formData = $state({ name: '', email: '', phone: '', message: '' });
	let submitted = $state(false);

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

	function handleSubmit(e: Event) {
		e.preventDefault();
		submitted = true;
		setTimeout(() => (submitted = false), 3000);
		formData = { name: '', email: '', phone: '', message: '' };
	}

	const contactInfo = [
		{
			label: 'Telefono',
			value: '+598 96 833 622',
			iconPath:
				'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
		},
		{
			label: 'Correo electronico',
			value: 'almacuidacomercial@gmail.com',
			iconPath:
				'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
		},
		// {
		// 	label: 'Direccion',
		// 	value: 'Av. 18 de Julio 1234, Montevideo, Uruguay',
		// 	iconPath:
		// 		'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
		// }
	];
</script>

<section id="contacto" bind:this={sectionRef} class="py-24 md:py-32 bg-beige-light/30 relative overflow-hidden">
	<div class="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-sage/5 rounded-full blur-3xl"></div>

	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
		<div class="grid lg:grid-cols-2 gap-16">
			<!-- Info Side -->
			<div
				class="transition-all duration-1000 {isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}">
				<span class="inline-block px-4 py-1.5 bg-beige/70 rounded-full text-xs font-semibold text-sage-dark tracking-widest uppercase mb-6">
					Contacto
				</span>
				<h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-darkgray mb-6 leading-tight">
					Estamos aqui para acompanarte
				</h2>
				<p class="text-darkgray/60 text-lg leading-relaxed mb-10">
					Agenda una visita guiada y descubre por que tantas familias confian en nosotros. Nuestro
					equipo esta listo para resolver todas tus dudas.
				</p>

				<div class="space-y-6">
					{#each contactInfo as item(item.label)}
						<div class="flex items-start gap-4">
							<div class="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center text-sage shrink-0">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d={ item.iconPath }
									/>
								</svg>
							</div>
							<div>
								<div class="text-sm text-darkgray/50 mb-0.5">{ item.label }</div>
								<div class="font-medium text-darkgray">{ item.value }</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Form Side -->
			<div class="transition-all duration-1000 delay-200 {isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}">
				<div class="glass-card rounded-3xl p-8 md:p-10">
					{#if submitted}
						<div class="text-center py-12">
							<div class="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
								<svg
									class="w-8 h-8 text-sage"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<h3 class="text-xl font-bold text-darkgray mb-2">Mensaje enviado!</h3>
							<p class="text-darkgray/60">Nos pondremos en contacto contigo muy pronto.</p>
						</div>
					{:else}
						<form onsubmit={handleSubmit} class="space-y-5">
							<div>
								<label class="block text-sm font-medium text-darkgray/70 mb-2" for="name">Nombre completo</label>
								<input
									name="name"
									type="text"
									required
									bind:value={formData.name}
									class="w-full px-4 py-3 rounded-xl bg-white/70 border border-beige/50 focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all duration-300 text-darkgray placeholder:text-darkgray/30"
									placeholder="Tu nombre"
								/>
							</div>
							<div class="grid sm:grid-cols-2 gap-5">
								<div>
									<label class="block text-sm font-medium text-darkgray/70 mb-2" for="email">Correo electronico</label>
									<input
										name="email"
										type="email"
										required
										bind:value={formData.email}
										class="w-full px-4 py-3 rounded-xl bg-white/70 border border-beige/50 focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all duration-300 text-darkgray placeholder:text-darkgray/30"
										placeholder="email@ejemplo.com"
									/>
								</div>
								<div>
									<label class="block text-sm font-medium text-darkgray/70 mb-2" for="tel">Telefono</label>
									<input
										name="tel"
										type="tel"
										bind:value={formData.phone}
										class="w-full px-4 py-3 rounded-xl bg-white/70 border border-beige/50 focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all duration-300 text-darkgray placeholder:text-darkgray/30"
										placeholder="+52 (55) 0000-0000"
									/>
								</div>
							</div>
							<div>
								<label class="block text-sm font-medium text-darkgray/70 mb-2" for="mensaje">Mensaje</label>
								<textarea
									name="mensaje"
									required
									rows={4}
									bind:value={formData.message}
									class="w-full px-4 py-3 rounded-xl bg-white/70 border border-beige/50 focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all duration-300 text-darkgray placeholder:text-darkgray/30 resize-none"
									placeholder="Cuentanos como podemos ayudarte..."></textarea>
							</div>
							<button
								type="submit"
								class="btn-shine w-full py-4 bg-sage text-white font-semibold rounded-xl hover:bg-sage-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
							>
								Enviar mensaje
							</button>
						</form>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
