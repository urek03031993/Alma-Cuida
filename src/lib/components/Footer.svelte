<script lang="ts">
	import Logo from "./Logo.svelte";

	const navLinks = ['Inicio', 'Servicios', 'Contacto'];
	// const legalLinks = ['Aviso de Privacidad', 'Terminos de Servicio', 'Politica de Cookies'];
	const socials = ['facebook', 'twitter', 'instagram', 'linkedin'];
</script>

<footer class="bg-darkgray text-white/80 py-16">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div class="grid md:grid-cols-4 gap-12 mb-12">
			<div class="md:col-span-2">
				<div class="flex items-center gap-3 mb-4">
					<div class="w-10 h-10 rounded-full flex items-center justify-center">
						<Logo/>						
					</div>
					<span class="text-xl font-semibold text-white">Alma Cuida</span>
				</div>
				<p class="text-white/50 leading-relaxed max-w-sm">
					Brindamos cuidado premium con calidez humana. Un hogar donde cada residente es tratado con
					el respeto y carino que merece.
				</p>
			</div>
			<div>
				<h4 class="font-semibold text-white mb-4">Enlaces</h4>
				<ul class="space-y-3">
					{#each navLinks as link(link)}
						<li>
							<a
								href="#{link.toLowerCase().replace(/\s+/g, '-')}"
								class="text-white/50 hover:text-sage-light transition-colors duration-300"
							>
								{link}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<!-- <div>
				<h4 class="font-semibold text-white mb-4">Legal</h4>
				<ul class="space-y-3">
					{#each legalLinks as link(link)}
						<li>
							<a
								href="#contact"
								class="text-white/50 hover:text-sage-light transition-colors duration-300"
							>
								{link}
							</a>
						</li>
					{/each}
				</ul>
			</div> -->
		</div>
		<div
			class="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
		>
			<p class="text-white/40 text-sm">&copy; 2026 Alma Cuida. Todos los derechos reservados.</p>
			<div class="flex items-center gap-4">
				{#each socials as social(social)}
					<a
						href="#social"
						class="w-10 h-10 rounded-full bg-white/5 hover:bg-sage/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
					>
						<span class="text-white/50 hover:text-white text-xs font-bold uppercase"
							>{social[0]}</span
						>
					</a>
				{/each}
			</div>
		</div>
	</div>
</footer>
