<!-- <script lang="ts">
	import { enhance } from '$app/forms';
	import ServiceForm from '$lib/components/forms/ServiceForm.svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import type { selectClient } from '$lib/server/types/interfaces';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	interface clientCRUD {
		id?: number,
		name: string,
		description: string,
		active: boolean,
		lastName: string;
		email: string;
		phone: string;
		address: string
		IdDocument: string;
		birthDate: Date;
	}

	let showForm = $state<boolean>(false);

	let formData = $state<clientCRUD>({
		id: undefined,
		name: '',
		description: '',
		lastName: '',
		email: '',
		phone: '',
		address: '',
		IdDocument: '',
		birthDate: new Date(),
		active: true
	});

	function addForm() {
		formData = { 	
			name: '',
			description: '',
			lastName: '',
			email: '',
			phone: '',
			address: '',
			IdDocument: '',
			birthDate: new Date(),
			active: true 
		};
		showForm = true;
	}

	function resetForm() {
		formData = { 	
			name: '',
			description: '',
			lastName: '',
			email: '',
			phone: '',
			address: '',
			IdDocument: '',
			birthDate: new Date(),
			active: true 
		};
		showForm = false;
	}

	function editClient(client: selectClient) {
		formData = {
			id: client.id,
			name: client.name,
			description: client.description ?? '',
			lastName: client.lastName,
			email: client.email,
			phone: client.phone,
			address: client.address ?? null,
			IdDocument: client.IdDocument,
			birthDate: new Date(),
			active: service.active,
			
		};
		showForm = true;
	}
</script> -->

<!-- <div class="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
	<section class="lg:col-span-3 glass-card rounded-3xl overflow-hidden flex flex-col">
		<div class="p-8 border-b border-beige-light/20 flex justify-between items-center">
			<h3 class="font-headline-md text-headline-md text-black/80">Administración de los Servicios</h3>
			<div class="relative"> -->
				<!--  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px]"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
				<input
					class="pl-10 pr-4 py-2 bg-white/50 border-outline-variant/30 rounded-xl focus:ring-sage focus:border-sage-dark text-sm font-label-md w-64"
					placeholder="Buscar servicios..."
					type="text"
				/> -->
				<!-- <button class="bg-sage-dark text-white px-4 py-2 rounded-lg font-label-md text-sm hover:bg-sage-dark/80 transition-all flex items-center"
					    onclick={addForm}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus pr-2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
					Agregar Servicio
				</button>
			</div> 
		</div>
		<div class="overflow-x-auto border-beige-light/20" >
			<table class="w-full text-left border-beige-light/20">
				<thead class="bg-beige/50">
					<tr>
						<th class="px-8 py-4 font-label-md text-black/70 text-xs uppercase tracking-widest">
							ID
						</th>
						<th class="px-8 py-4 font-label-md text-black/70 text-xs uppercase tracking-widest">
							Nombre
						</th>
						<th	class="px-8 py-4 font-label-md text-black/70 text-xs uppercase tracking-widest">
							Descripción
						</th>
						<th class="px-8 py-4 font-label-md text-black/70 text-xs uppercase tracking-widest">
							Activo
						</th>
						<th class="px-8 py-4 font-label-md text-black/70 text-xs uppercase tracking-widest">
							Acciones
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-beige-light/10">
					{#each data.data as servicio, index (servicio.id)}
						<tr class="hover:bg-white/40 transition-colors border-beige-light/20">
							<td class="px-8 py-6">{index + 1}</td>
							<td class="px-8 py-6">{servicio.name}</td>
							<td class="px-8 py-6">{servicio.description}</td>
							<td class="px-8 py-6">{servicio.active ? 'Sí' : 'No'}</td>
							<td class="px-8 py-6 flex">
								<button class="text-sage-dark hover:underline font-label-md text-sm flex items-center gap-1 p-1"
										onclick={() => editService(servicio)}>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-pen-line-icon lucide-file-pen-line"><path d="M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z"/><path d="M14.487 7.858A1 1 0 0 1 14 7V2"/><path d="M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516"/><path d="M8 18h1"/></svg>
									Editar
								</button>

								<form method="POST" action="?/delete" class="inline-form" use:enhance>
									<input type="hidden" name="id" value={servicio.id} />
									<button class="text-red-500 hover:underline font-label-md text-sm flex items-center gap-1 p-1">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
										Eliminar
									</button>
								</form>								
							</td>						
						</tr>
					{/each} -->

					<!-- <tr class="hover:bg-white/40 transition-colors border-beige-light/20">
						<td class="px-8 py-6">
							<div class="flex items-center gap-3">
								<div class="w-10 h-10 rounded-full bg-beige/50 flex items-center justify-center overflow-hidden">
									<img
										alt="Resident"
										class="w-full h-full object-cover"
										data-alt="An elegant elderly gentleman with white hair wearing a soft linen shirt, sitting in a sunlit common area of Serena Residencial. He is smiling warmly at the camera, embodying a life of serene luxury and high-quality care within a bright, modern senior living community."
										src="https://lh3.googleusercontent.com/aida-public/AB6AXuC44V73fsylLJBslS9lyxNkW0XDLui48uHZnURO4ieroH_r3TSwzyckjCopwFsOxptEYltYXJlAWl-_tt4VpNT0GWgsp65_dU974N-ibGQ-Qkjhf8D0NblqNhiQ1GttFblWLzrt0SxDZW8ESJ_Y16O4EM_yB7-YzVKp7rog51v-0FwiawdTVqbDY6jXwdFcC7g-INZ_aru3BGq9EvYfgM0Njob9bn6aYR-Q_l_Fe1lor9LyTgdS4143tG9oNBJwH6MzYxBx85qTaAQc"
									/>
								</div>
								<div>
									<p class="font-label-md text-black/70">Roberto Perez</p>
									<p class="text-xs text-text-black/70">Cama 25 • Piso 2</p>
								</div>
							</div>
						</td>
						<td class="px-8 py-6">
							<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-dark/10 text-sage-dark text-xs font-bold">
								<span class="w-2 h-2 rounded-full bg-sage-dark animate-pulse"></span>
								Activo
							</span>
						</td>
						<td class="px-8 py-6">
							<p class="text-sm text-on-surface-variant">Hoy, 08:45 AM</p>
						</td>
						<td class="px-8 py-6">
							<button class="text-sage-dark hover:underline font-label-md text-sm">Ver Perfil</button
							>
						</td>
					</tr>
					<tr class="hover:bg-white/40 transition-colors border-beige-light/20">
						<td class="px-8 py-6">
							<div class="flex items-center gap-3">
								<div class="w-10 h-10 rounded-full bg-black/70 flex items-center justify-center overflow-hidden">
									<img
										alt="Resident"
										class="w-full h-full object-cover"
										data-alt="A portrait of a sophisticated elderly woman with silver hair and gentle eyes, wearing a soft pashmina shawl. She is seated in a beautifully decorated library at Serena Residencial, surrounded by warm wood tones and soft ambient lighting. The atmosphere is one of luminous tranquility and premium domestic comfort."
										src="https://lh3.googleusercontent.com/aida-public/AB6AXuABjRxfKJ4_LT7d0QspCepW5XaPFFKbl73pwexQBezvRPaM7Ue7wnlu2mJewj8yWLlgnc7kqaWLfleeC61TcTiL_Tk77gTERwHI5JZBrzR2YFFKx3ZhvbBAVu1O5flfyRqpC_PSpctR_PaPLEG7DMmpz74_Wn21U8NNg_GIO4jO5_xqTUd5EpiIzWVJdeBw9tKWFFWfk8WlE3Kx-lh5yB5YKiTAvyy280Hq3Kt-A7cNnFm3CJS41zU4vInehm58cM56FRRC7SgXpIx5"
									/>
								</div>
								<div>
									<p class="font-label-md text-on-surface">Olivia Sterling</p>
									<p class="text-xs text-on-surface-variant">Cama 15 • Piso 1</p>
								</div>
							</div>
						</td>
						<td class="px-8 py-6">
							<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-darkgray/10 text-darkgray text-xs font-bold">
								<span class="w-2 h-2 rounded-full bg-darkgray"></span>
								Descansando
							</span>
						</td>
						<td class="px-8 py-6">
							<p class="text-sm text-on-surface-variant">Ayer, 09:30 PM</p>
						</td>
						<td class="px-8 py-6">
							<button class="text-sage-dark hover:underline font-label-md text-sm">Ver Perfil</button>
						</td>
					</tr>
					<tr class="hover:bg-white/40 transition-colors border-beige-light/20">
						<td class="px-8 py-6">
							<div class="flex items-center gap-3">
								<div class="w-10 h-10 rounded-full bg-black/70 flex items-center justify-center overflow-hidden">
									<img
										alt="Resident"
										class="w-full h-full object-cover"
										data-alt="A portrait of a distinguished older man in a tailored blazer, smiling in a brightly lit, high-end residential hallway. The walls feature elegant moldings and soft cream paint. He represents the refined and active lifestyle offered at Serena Residencial, where every detail is designed for luxury and comfort."
										src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6ewdxziTGwBSXTq0WpnG8y_iBkYCu7n4-ZukBlX2HMWokvbAOS2pqJ1oWjHv0GU8ARQ0_e2joRfRMVqUikdeHlA6IypSfz-BcmOf4rx8iGyXFxSLvlf-deMZ4Sp6cfxsKfLRkxbPYIvHpkNKU4KZqD1X976vnMHJs-sloiGwuDRY5ldjJyHZhABqJf8YkSl-FYEw8rvWvojPkanNX7KOFJnA2g_HrZreehHkTZ9xcZv8XCnxB023PRlNg2q2u-E1LNealWu6Vy-h8"
									/>
								</div>
								<div>
									<p class="font-label-md text-black">Angel Aliaga</p>
									<p class="text-xs text-black/70">Cama 9 • Piso 1</p>
								</div>
							</div>
						</td>
						<td class="px-8 py-6">
							<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error/10 text-error text-xs font-bold">
								<span class="w-2 h-2 rounded-full bg-error"></span>
								De baja
							</span>
						</td>
						<td class="px-8 py-6">
							<p class="text-sm text-on-surface-variant">Oct 12, 2024</p>
						</td>
						<td class="px-8 py-6">
							<button class="text-sage-dark hover:underline font-label-md text-sm">Ver Perfil</button>
						</td>
					</tr> -->
				<!-- </tbody>
			</table>
		</div>
		<div class="p-6 border-t border-border-beige-light/20 flex justify-center">
			<button class="text-black/70 font-label-md text-sm hover:text-primary transition-all">
				Mostrar mas
			</button>
		</div>
	</section>
</div>

<Modal bind:open={showForm}>
	<ServiceForm data={formData} {resetForm} errors={form?.error}/>
</Modal> -->


