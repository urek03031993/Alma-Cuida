<script lang="ts">
	import ModalitiesCard from '$lib/components/ModalitiesCard.svelte';
	import type { PageProps } from './$types';

    let { data }: PageProps = $props();
</script>


<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-cover bg-center" 
        data-alt={data.service.image.alt} 
        style="background-image: url({data.service.image.url})"></div>
    <div class="absolute inset-0 hero-gradient"></div>
    <div class="absolute inset-0 flex items-end pb-24 px-margin-desktop max-w-container-max mx-auto">
        <div class="max-w-2xl">
            <span class="inline-block px-4 py-1.5 rounded-full uppercase bg-sage-light/20 text-sage-dark font-label-md text-label-md mb-6 backdrop-blur-md border border-primary/20">
                Nuestra Filosofía de Cuidado
            </span>
            <h1 class="font-headline-xl text-headline-xl text-primary mb-6 leading-tight">
                {data.service.name}
            </h1>
            <p class="font-body-lg text-body-lg text-secondary max-w-xl">
                {data.service.description}
            </p>
        </div>
    </div>
</section> 


{#if data.service.modalities.length > 0}
    <section class="py-24 bg-surface-container-lowest">
        <div class="px-margin-desktop max-w-container-max mx-auto">
            <div class="text-center mb-16">
                <h2 class="font-headline-lg text-headline-lg text-primary mb-4">Modalidades de {data.service.name}</h2>               
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each data.service.modalities as modality, index(modality.id)}
                    <ModalitiesCard
                        name={modality.name}
                        description={modality.description ?? ''}
                        delay={index * 100}
                    />                      
                {/each}
            </div>
        </div>
    </section>    
{/if}    


<style>	
	.hero-gradient {
		background: linear-gradient(to bottom, rgba(251, 249, 248, 0) 0%, rgba(251, 249, 248, 1) 100%);
	}
</style>
