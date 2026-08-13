<script lang="ts">
	import { Lock, Mail, User } from "@lucide/svelte";
	import type { UserFormProps } from "./intefaces";
	import { enhance } from "$app/forms";

	let { data = $bindable(), errors, resetForm }: UserFormProps = $props();
</script>


<div class="w-full bg-surface/60 p-8 md:p-12">
	<div class="mb-10">
		<h1 class="font-headline-lg text-headline-lg text-primary mb-2">
			Registro de Usuario
		</h1>
		<p class="text-on-surface-variant font-body-md text-body-md opacity-80">
			Comienza tu viaje hacia una vida de plenitud y cuidado excepcional.
		</p>
	</div>
	<form class="space-y-6" method="POST" use:enhance>
		<input type="hidden" name="id" id="id" bind:value={data.id}/>
		<div class="space-y-1.5">
			<label for="name" class="font-label-md text-label-md text-on-surface-variant block">
				Nombre completo
			</label>
			{#if errors?.name}
				<span class="text-error">{errors?.name[0]}</span>							
			{/if}	
			<div class="relative">
				<User class="absolute left-4 top-1/2 -translate-y-1/2"/>
				<input
					class="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-md transition-all"
					placeholder="Ej. María García"
					type="text"
					name="name"
					id="name"
					bind:value={data.name}
				/>
			</div>
		</div>

		<div class="space-y-1.5">
			<label for="mail" class="font-label-md text-label-md text-on-surface-variant block">
				Correo electrónico
			</label>
			{#if errors?.email}
				<span class="text-error">{errors?.email[0]}</span>							
			{/if}	
			<div class="relative">
				<Mail class="absolute left-4 top-1/2 -translate-y-1/2"/>
				<input
					class="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-md transition-all"
					placeholder="email@ejemplo.com"
					type="email"
					name="email"
					id="email"
					bind:value={data.email}
				/>
			</div>
		</div>

		<div class="space-y-1.5">
			<label for="password" class="font-label-md text-label-md text-on-surface-variant block">
				Contraseña
			</label>
			{#if errors?.password}
				<span class="text-error">{errors?.password[0]}</span>							
			{/if}
			<div class="relative">
				<Lock  class="absolute left-4 top-1/2 -translate-y-1/2"/>
				<input
					class="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-md transition-all"
					placeholder="••••••••"
					type="password"
					name="password"
					id="password"
				/>
			</div>
		</div>
		<div class="space-y-1.5">
			<label for="password1" class="font-label-md text-label-md text-on-surface-variant block">
				Repetir Contraseña
			</label>
			<div class="relative">
				<Lock  class="absolute left-4 top-1/2 -translate-y-1/2"/>
				<input
					class="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-md transition-all"
					placeholder="••••••••"
					type="password"
					name="password1"
					id="password1"
				/>
			</div>
		</div>
		<button class="w-full bg-sage-dark text-white py-4 rounded-full font-headline-md text-headline-md shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
				type="submit"
		>
			Crear Cuenta
		</button>
		<button class="w-full bg-sage-dark text-white py-4 rounded-full font-headline-md text-headline-md shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
				type="button"
				onclick={()=> resetForm}
		>
			Cancelar
		</button>
	</form>
</div>
