<script>
	import { resolve } from "$app/paths";
	import { CalendarDays, MoveRight, StarCheck, Users } from "@lucide/svelte";

</script>
<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">

	<header class="mb-16 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
		<div class="space-y-2">
			<h1 class="font-headline-xl text-headline-xl text-on-surface">
				Bienvenido de nuevo
			</h1>
			<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
				Gestione la excelencia de Alma Cuida desde un solo lugar. Su compromiso con el
				adulto mayor comienza aquí.
			</p>
		</div>		
	</header>
	<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
		<div class="glass-card rounded-4xl p-8 flex flex-col justify-between group cursor-pointer h-72">
			<div class="space-y-4">
				<div class="w-14 h-14 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
					<StarCheck size={35} />
				</div>
				<div>
					<h3 class="font-headline-md text-headline-md text-on-surface">Catálogo de Servicios</h3>
					<p class="font-body-md text-body-md text-on-surface-variant mt-2">
						Cree, actualice y administre servicios de Alma Cuida.
					</p>
				</div>
			</div>
			<div class="flex items-center text-primary font-label-md group-hover:translate-x-2 transition-transform">
				<a href={resolve('/(authed)/admin/services')} class="flex items-center gap-1">
					<span>Acceder</span>
					<MoveRight class="ml-2" />
				</a>
			</div>
		</div>

		<div class="glass-card rounded-4xl p-8 flex flex-col justify-between group cursor-pointer h-72">
			<div class="space-y-4">
				<div class="w-14 h-14 bg-secondary-container rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-500">
					<CalendarDays size={35} />
				</div>
				<div>
					<h3 class="font-headline-md text-headline-md text-on-surface">Catálogo de Modalidades</h3>
					<p class="font-body-md text-body-md text-on-surface-variant mt-2">
						Defina y administre modalidades de atención para los residentes.
					</p>
				</div>
			</div>
			<div class="flex items-center text-primary font-label-md group-hover:translate-x-2 transition-transform">
				<a href={resolve('/(authed)/admin/modalities')} class="flex items-center gap-1">
					<span>Gestionar</span>
					<MoveRight class="ml-2" />
				</a>
			</div>
		</div>

		<div
			class="glass-card rounded-4xl p-8 flex flex-col justify-between group cursor-pointer h-72">
			<div class="space-y-4">
				<div class="w-14 h-14 bg-tertiary-fixed rounded-2xl flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform duration-500">
					<Users size={35} />
				</div>
				<div>
					<h3 class="font-headline-md text-headline-md text-on-surface">Usuarios</h3>
					<p class="font-body-md text-body-md text-on-surface-variant mt-2">
						Administre cuentas del personal administrativo.
					</p>
				</div>
			</div>
			<div class="flex items-center text-primary font-label-md group-hover:translate-x-2 transition-transform">
				<a href={resolve('/(authed)/admin/users')} class="flex items-center gap-1">
					<span>Administrar</span>
					<MoveRight class="ml-2" />
				</a>
			</div>
		</div>
	</section>

</div>

<style>
	.glass-card {
		background: rgba(232, 223, 200, 0.4);
		backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		transition:
			transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
			box-shadow 0.3s ease;
	}

	.glass-card:hover {
		transform: perspective(1000px) translateY(-4px);
		box-shadow: 0 12px 24px -10px rgba(122, 158, 126, 0.2);
	}
</style>
