<script lang="ts">
	import { enhance } from '$app/forms';
	import ServiceForm from '$lib/components/forms/ServiceForm.svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import type { loadService, serviceCRUD } from '$lib/server/types/interfaces';
	import { toastStore } from '$lib/stores/stores';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

    $effect(()=>{
        if(form?.success) {
			showForm = false;
            toastStore.success("Accion realizada satisfactoriamente");
        }

        if(form?.errors) {
			showForm = false;
            toastStore.error(form.errors);
        }
    });

	let showForm = $state<boolean>(false);

	let formData = $state<serviceCRUD>({
		id: undefined, 
		name: undefined, 
		description: undefined, 
		active: undefined, 
		imageUuid: undefined,
		image: undefined 
	});

	function addForm() {
		formData = { 
			id: undefined, 
			name: undefined, 
			description: undefined, 
			active: undefined, 
			imageUuid: undefined,
			image: undefined 
		};
		showForm = true;
	}

	function resetForm() {
		formData = { 
			id: undefined, 
			name: undefined, 
			description: undefined, 
			active: undefined, 
			imageUuid: undefined,
			image: undefined 
		};
		showForm = false;
	}

	function editService(service: loadService) {
		formData = { 
			id: service.id,
			name: service.name,
			description: service.description ?? '',
			imageUuid: service.imageUuid,
			active: service.active,
			image: {
				id: service.image.id,
				name: service.image.name,
				alt: service.image.alt,
				url: service.image.url,
				uuid: service.image.uuid,
			}
		};
		showForm = true;
	}
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
	<section class="lg:col-span-3 glass-card rounded-3xl overflow-hidden flex flex-col">
		<div class="p-8 border-b border-beige-light/20 flex justify-between items-center">
			<h3 class="font-headline-md text-headline-md text-black/80">Administración de los Servicios</h3>
			<div class="relative">
				<!--  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px]"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
				<input
					class="pl-10 pr-4 py-2 bg-white/50 border-outline-variant/30 rounded-xl focus:ring-sage focus:border-sage-dark text-sm font-label-md w-64"
					placeholder="Buscar servicios..."
					type="text"
				/> -->
				<button class="bg-sage-dark text-white px-4 py-2 rounded-lg font-label-md text-sm hover:bg-sage-dark/80 transition-all flex items-center"
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
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</div>

<Modal bind:open={showForm}>
	<ServiceForm bind:data={formData} {resetForm} errors={form?.fieldErrors}/>
</Modal>


