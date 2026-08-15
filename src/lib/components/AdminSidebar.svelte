<script>
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import { authClient } from "$lib/clientAuth/client";
	import { goto } from "$app/navigation";
	import { CalendarDays, LayoutDashboard, LogOut, StarCheck, Users } from "@lucide/svelte";
	import { toastStore } from "$lib/stores/stores";

	const session = authClient.useSession();
	async function logout() {
		const { data , error} = await authClient.signOut();

		if(data && data.success) {
			goto(resolve("/(app)"));
			return;
		}


		if(error) {
			console.log("Logout error: ", error);
			toastStore.error("Se produjo un error al cerrar sesión..");
		}
				

	}
</script>

<aside class="w-72 bg-lightgray fixed h-full border-r border-darkgray/10 z-30 hidden md:flex flex-col">
	<div class="p-8">
		<h1 class="font-headline-md text-headline-md font-semibold text-sage-dark">
			<a href={resolve('/')}>Alma Cuida</a>
		</h1>
		<p class="text-label-md font-label-md text-darkgray/70 mt-1 uppercase tracking-widest">
			Admin Portal
		</p>
	</div>
	<nav class="flex-1 px-4 space-y-2 mt-4">
		<a class="sidebar-item-active flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
			aria-current={page.url.pathname === resolve('/(authed)/admin')}
           href={resolve('/(authed)/admin')}
		>
			<LayoutDashboard />
			<span class="font-label-md">Administración</span>
		</a>
		<a
			class="sidebar-item-active text-darkgray hover:bg-beige/40 flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
			aria-current={page.url.pathname === resolve('/(authed)/admin/services')}
           href={resolve('/(authed)/admin/services')}
		>			
			<StarCheck />
			<span class="font-label-md">Servicios</span>
		</a>
		<a
			class="sidebar-item-active text-darkgray hover:bg-beige/40  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
			aria-current={page.url.pathname === resolve('/(authed)/admin/modalities')}
           href={resolve('/(authed)/admin/modalities')}
		>
			<CalendarDays />
			<span class="font-label-md">Modalidades</span>
		</a>
		<a
			class="text-darkgray hover:bg-beige/40  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
			aria-current={page.url.pathname === resolve('/(authed)/admin/users')}
           href={resolve('/(authed)/admin/users')}
		>
			<Users />
			<span class="font-label-md">Usuarios</span>
		</a>
		<!-- <a
			class="text-darkgray hover:bg-beige/40  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
			aria-current={page.url.pathname === resolve('/(authed)/admin/configuracion')}
           href={resolve('/(authed)/admin/configuracion')}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
			<span class="font-label-md">Configuración</span>
		</a> -->
		<button class="text-darkgray hover:bg-beige/40  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
				type="button"
				onclick={()=> logout()}			
		>
			<LogOut />
			<span class="font-label-md">Cerrar Sesion</span>
		</button>
		
	</nav>
	<div class="p-6 border-t border-darkgray/10 mt-auto">
		<div class="flex items-center gap-3">
			<div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold overflow-hidden shadow-sm">
				<img
					alt="Admin Profile"
					class="w-full h-full object-cover"
					data-alt="A professional headshot of a female administrator with a kind and welcoming expression. She is in a bright, modern office with soft sage green accents and large windows. The lighting is warm and natural, reinforcing the premium corporate yet domestic feel of the luxury senior living brand."
					src="https://lh3.googleusercontent.com/aida/AP1WRLv7LRBnxKPoOk2NvqjcX1qxpkLoj0Y0HcxZB2kzClTeoFeFyLSHA0DlWepw9sEyAjGX89MCBhe5dtlZn27NV3VQPCt7ZVcHdSZ-2tSXTU4NGgTnayEeYperfr27Pqc1GB_LwaWc8Z2jSFOWuXqPZHlziMIMN89PjViVahKlmWz2Pje5Hy0x5YYTkZGnyl40WSZi54lYIaRahtBSjHqgDbzeasrKHqIRi-Op_kfDmSVrRdq49ZhrGSRpPTA" 
				/>
			</div>
			{#if $session.data}
				<div>
					<p class="font-label-md text-on-surface text-sm">{$session.data.user.name}</p>
					<p class="text-[12px] text-darkgray">Administrator</p>
				</div>
			{/if}			
		</div>
	</div>
</aside>

<nav class="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-low/80 backdrop-blur-xl border-t border-outline-variant/20 px-4 py-3 flex justify-around items-center z-50">
	<a class="flex flex-col items-center gap-1 text-primary" href={resolve('/(app)')}>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
		<span class="text-[10px] font-bold uppercase tracking-tighter">Inicio</span>
	</a>
	<a class="flex flex-col items-center gap-1 text-on-surface-variant" href={resolve('/(authed)/admin/care')}>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils-icon lucide-utensils"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
		<span class="text-[10px] font-bold uppercase tracking-tighter">Cenas</span>
	</a>
	<a class="flex flex-col items-center gap-1 text-on-surface-variant" href={resolve('/(authed)/admin/configuracion')}>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
		<span class="text-[10px] font-bold uppercase tracking-tighter">Conf</span>
	</a>
</nav>

<style>
	.sidebar-item-active[aria-current=true] {
		background-color: rgba(68, 102, 74, 0.1);
		color: #44664a;
		border-right: 3px solid #44664a;
	}
</style>
