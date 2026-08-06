<script lang="ts">
	import { enhance } from "$app/forms";
	import { ImagePlus } from "@lucide/svelte";
	import type { ServiceFormProps } from "./intefaces";

	let { data = $bindable(), errors, resetForm }: ServiceFormProps = $props();

	let loading = $state(false);
	let imageUrl = $derived(data.image?.url);
	let inputFile = <FileList>$state();

	function resetImageUrl(){
		imageUrl = undefined;
		inputFile = new DataTransfer().files
	}
</script>

<section class="mb-24">
	<form action={data.id ? '?/update' : '?/create'} method="POST" enctype="multipart/form-data" 
		  use:enhance={() => {
			loading = true;

			return async ({ update }) => {
			await update();
			loading = false;
		};
	}}>
		<div class="flex items-center gap-4 mb-8">
			<h2 class="font-headline-lg text-headline-lg text-sage-dark">{data.id ? 'Actualizar' : 'Crear'} Servicio</h2>
		</div>
		<div class="grid grid-cols-1 lg:grid-cols-1 gap-12">
			<div class="glass-card p-10 rounded-xl space-y-8"
					style="background: rgb(250, 249, 246); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.2);">
				<h3 class="font-headline-md text-headline-md text-primary mb-6">
					Datos del Servicio
				</h3>
				<div class="space-y-6">
					<input type="number" hidden name="id" bind:value={data.id} disabled={loading}>
					<div class="group">
						<label class="block font-label-md text-on-surface-variant mb-2 transition-colors group-focus-within:text-primary"
								for="name">
							Nombre del Servicio
						</label>
						{#if errors?.name}
							<span class="text-error">{errors?.name[0]}</span>							
						{/if}												
						<input
							class="w-full border-2 border-transparent focus:border-sage-dark focus:ring-0 rounded-lg p-4 font-body-md transition-all outline-none text-on-surface"
							placeholder="e.g. Cuidadoras"
							type="text"
							name="name"
							id="name"
							style="background-color: #F2F0EA;"
							bind:value={data.name}
							disabled={loading}
						/>
					</div>
					<div class="group">						
						<label class="block font-label-md text-on-surface-variant mb-4 transition-colors group-focus-within:text-sage-dark" for="image">Imagen del Servicio</label>
						{#if errors?.image}
							<span class="text-error">{errors?.image[0]}</span>							
						{/if}
						<div class="relative border-2 border-dashed border-primary/30 rounded-xl p-12 flex flex-col items-center justify-center gap-4 transition-all hover:border-primary hover:bg-primary/5 cursor-pointer" style="background-color: #F2F0EA;">
							{#if imageUrl}
								<img alt={data.image?.alt} src={data.image?.url}/>
								<button class="absolute top-1 right-1 p-1 bg-error text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity scale-75" 
										type="button" 
										aria-label="closeThumb"
										onclick={()=> resetImageUrl()}>
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
								</button> 
							{:else}
								<input type="file" class="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" name="image" id="image" 
										disabled={loading} bind:files={inputFile}>
								<ImagePlus color="green" size={48}/>							
								<div class="text-center">
									<p class="font-body-md text-on-surface">Arrastra tu foto aquí o haz clic para buscar</p>
									<p class="text-sm text-on-surface-variant mt-1">Soporta formatos .jpg y .png</p>
								</div>
								<button type="button" class="mt-2 bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-label-md hover:scale-105 transition-all pointer-events-none">Select File</button>
							{/if}
						</div>
					</div>
		
					<div class="group">
						<label class="block font-label-md text-on-surface-variant mb-2 transition-colors group-focus-within:text-primary"
								for="description">
							Descripcion
						</label>
						{#if errors?.description}
							<span class="text-error">{errors?.description[0]}</span>							
						{/if}
						<textarea
							class="w-full border-2 border-transparent focus:border-sage-dark focus:ring-0 rounded-lg p-4 font-body-md transition-all outline-none text-on-surface"
							placeholder="Describe any dietary or accessibility needs..."
							rows="4"
							name="description"
							style="background-color: #F2F0EA;"
							bind:value={data.description}
							disabled={loading}
						></textarea>
					</div>
				</div>
				<div class="space-y-6">
					<div class="group">
						<div>
							<span class="block font-label-md text-on-surface-variant mb-4">Accesibilidad</span>
							<div class="grid grid-cols-2 gap-4">
								{#if errors?.active}
									<span class="text-error">{errors?.active[0]}</span>							
								{/if}
								<label class="flex items-center gap-3 cursor-pointer group">
									<input
										class="w-6 h-6 rounded border-outline text-sage-dark focus:ring-sage-dark transition-all checked:bg-sage-light"
										type="checkbox"
										name="active"
										style="background-color: sage-light;"
										bind:checked={data.active}
										disabled={loading}
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
			<button type="submit" disabled={loading}
					class="btn-shine w-full py-4 bg-sage text-white font-semibold rounded-xl hover:bg-sage-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
					{#if loading}
						<span class="spinner"></span>
      					Enviando...
					{:else}
						{data.id ? 'Actualizar' : 'Crear'}
					{/if }					
			</button>
			<button type="button" onclick={resetForm} disabled={loading}
					class="btn-shine w-full py-4 bg-beige/50 text-sage-dark font-semibold rounded-xl hover:bg-gray/60 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
					Cancelar
			</button>
		</div>
	</form>
</section>

<style>
  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 8px;
    vertical-align: middle;
  }
  
  @keyframes spin { to { transform: rotate(360deg); } }
</style>