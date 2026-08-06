<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ModalityFormProps } from "./intefaces";

	let { data, services, resetForm }: ModalityFormProps = $props();
</script>

<section class="mb-24">
	<form action={data.id ? '?/update' : '?/create'} method="POST" use:enhance>
		<div class="flex items-center gap-4 mb-8">
			<h2 class="font-headline-lg text-headline-lg text-sage-dark">Crear Modalidad</h2>
		</div>
		<div class="grid grid-cols-1 lg:grid-cols-1 gap-12">
			<div class="glass-card p-10 rounded-xl space-y-8"
					style="background: rgb(250, 249, 246); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.2);">
				<h3 class="font-headline-md text-headline-md text-primary mb-6">
					Datos de la Modalidad
				</h3>
				<div class="space-y-6">
					<input type="number" hidden name="id" bind:value={data.id}>
					<div class="group">
						<label class="block font-label-md text-on-surface-variant mb-2 transition-colors group-focus-within:text-primary"
								for="name">
							Nombre
						</label>
						<input
							class="w-full border-2 border-transparent focus:border-sage-dark focus:ring-0 rounded-lg p-4 font-body-md transition-all outline-none text-on-surface"
							placeholder="e.g. Hospital, Casa - Hospital"
							type="text"
							name="name"
							id="name"
							style="background-color: #F2F0EA;"
							bind:value={data.name}
						/>
					</div>
					<div class="group">
						<label class="block font-label-md text-on-surface-variant mb-2 transition-colors group-focus-within:text-primary"
								for="basePrice">
							Precio
						</label>
						<input
							class="w-full border-2 border-transparent focus:border-sage-dark focus:ring-0 rounded-lg p-4 font-body-md transition-all outline-none text-on-surface"
							placeholder="e.g. Hospital, Casa - Hospital"
							type="number"
							name="basePrice"
							id="basePrice"
							style="background-color: #F2F0EA;"
							bind:value={data.basePrice}
						/>
					</div>
					<div class="group">
						<label class="block font-label-md text-on-surface-variant mb-2 transition-colors group-focus-within:text-primary"
								for="serviceId">
							Servicio
						</label>
						<select
							class="w-full border-2 border-transparent focus:border-primary-container focus:ring-0 rounded-lg p-4 font-body-md transition-all outline-none text-on-surface appearance-none"
							style="background-color: #F2F0EA;"
							name="serviceId"
							id="serviceId"
						>
							{#each services as service(service.id)}
								<option value={service.id}>{service.name}</option>
								
							{/each}
						</select>
					</div>			
					<div class="group">
						<label class="block font-label-md text-on-surface-variant mb-2 transition-colors group-focus-within:text-primary"
								for="description">
							Descripcion
						</label>
						<textarea
							class="w-full border-2 border-transparent focus:border-sage-dark focus:ring-0 rounded-lg p-4 font-body-md transition-all outline-none text-on-surface"
							placeholder="Describe any dietary or accessibility needs..."
							rows="4"
							name="description"
							style="background-color: #F2F0EA;"
							bind:value={data.description}
						></textarea>
					</div>
				</div>
				<div class="space-y-6">
					<div class="group">
						<div>
							<span class="block font-label-md text-on-surface-variant mb-4">Accesibilidad</span>
							<div class="grid grid-cols-2 gap-4">
								<label class="flex items-center gap-3 cursor-pointer group">
									<input
										class="w-6 h-6 rounded border-outline text-sage-dark focus:ring-sage-dark transition-all checked:bg-sage-light"
										type="checkbox"
										name="active"
										style="background-color: sage-light;"
										bind:checked={data.active}
									/>
									<span class="font-body-md text-on-surface-variant group-hover:text-sage-dark transition-colors">
										Activo
									</span>
								</label>
							</div>
						</div>					
					</div>	
				</div>
			</div>
		</div>
		<div class="space-y-6">
			<button type="submit"
					class="btn-shine w-full py-4 bg-sage text-white font-semibold rounded-xl hover:bg-sage-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
					{data.id ? 'Actualizar' : 'Crear'}
			</button>
			<button type="button" onclick={resetForm}
					class="btn-shine w-full py-4 bg-beige/50 text-sage-dark font-semibold rounded-xl hover:bg-gray/60 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
					Cancelar
			</button>
		</div>
	</form>
</section>
