<script>
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
</script>

<aside class="w-72 bg-lightgray fixed h-full border-r border-darkgray/10 z-30 hidden md:flex flex-col">
	<div class="p-8">
		<h1 class="font-headline-md text-headline-md font-semibold text-sage-dark">
			<a href={resolve('/(app)')}>Alma Cuida</a>
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
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard-icon lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
			<span class="font-label-md">Administración</span>
		</a>
		<a
			class="text-darkgray hover:bg-beige/40 flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
			aria-current={page.url.pathname === resolve('/(authed)/admin/personal')}
           href={resolve('/(authed)/admin/personal')}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>
			<span class="font-label-md">Resident Management</span>
		</a>
		<a
			class="text-darkgray hover:bg-beige/40  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
			aria-current={page.url.pathname === resolve('/(authed)/admin/visits')}
           href={resolve('/(authed)/admin/visits')}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-days-icon lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
			<span class="font-label-md">Upcoming Visits</span>
		</a>
		<a
			class="text-darkgray hover:bg-beige/40  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
			aria-current={page.url.pathname === resolve('/(authed)/admin/services')}
           href={resolve('/(authed)/admin/services')}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase-medical-icon lucide-briefcase-medical"><path d="M12 11v4"/><path d="M14 13h-4"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M18 6v14"/><path d="M6 6v14"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
			<span class="font-label-md">Care Services</span>
		</a>
		<a
			class="text-darkgray hover:bg-beige/40  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
			aria-current={page.url.pathname === resolve('/(authed)/admin/care')}
           href={resolve('/(authed)/admin/care')}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils-icon lucide-utensils"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
			<span class="font-label-md">Dining Logs</span>
		</a>
		<a
			class="text-darkgray hover:bg-beige/40  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
			aria-current={page.url.pathname === resolve('/(authed)/admin/configuracion')}
           href={resolve('/(authed)/admin/configuracion')}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
			<span class="font-label-md">Configuración</span>
		</a>
	</nav>
	<div class="p-6 border-t border-darkgray/10 mt-auto">
		<div class="flex items-center gap-3">
			<div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold overflow-hidden shadow-sm">
				<img
					alt="Admin Profile"
					class="w-full h-full object-cover"
					data-alt="A professional headshot of a female administrator with a kind and welcoming expression. She is in a bright, modern office with soft sage green accents and large windows. The lighting is warm and natural, reinforcing the premium corporate yet domestic feel of the luxury senior living brand."
					src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdNGnaHO8Skg-JLIGDBfoZMILPYK2JzF9E4JLMmdqgN4-p-ifmbCUiNOCCa6nJ3v2-XLzdY-Ifi4WU6si7bggY_PCK48hIRp0QDl5-qkpNOTfSknZQ99Dns-1P09RXRpUwJ5K-Cl8gSI-TAHkOXLglq0ONxL11E5URRd39-iUeHnujj5B0zOCujFKY7SGdXMFxRw-s40nyuDaz_7cJ0cN1pw4ITfU-Ts5fkl6Tms1R_g-wFhhKVwoKlYJzrBzkdqZ0IUH_zJsPVxkF"
				/>
			</div>
			<div>
				<p class="font-label-md text-on-surface text-sm">Martin Rozano</p>
				<p class="text-[12px] text-darkgray">Administrator</p>
			</div>
		</div>
	</div>
</aside>

<nav class="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-low/80 backdrop-blur-xl border-t border-outline-variant/20 px-4 py-3 flex justify-around items-center z-50">
	<a class="flex flex-col items-center gap-1 text-primary" href={resolve('/(app)')}>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
		<span class="text-[10px] font-bold uppercase tracking-tighter">Home</span>
	</a>
	<a class="flex flex-col items-center gap-1 text-on-surface-variant" href={resolve('/(authed)/admin/personal')}>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>
		<span class="text-[10px] font-bold uppercase tracking-tighter">Residents</span>
	</a>
	<a class="flex flex-col items-center gap-1 text-on-surface-variant" href={resolve('/(authed)/admin/care')}>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils-icon lucide-utensils"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
		<span class="text-[10px] font-bold uppercase tracking-tighter">Dinning</span>
	</a>

	<a class="flex flex-col items-center gap-1 text-on-surface-variant" href={resolve('/(authed)/admin/visits')}>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-days-icon lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
		<span class="text-[10px] font-bold uppercase tracking-tighter">Visits</span>
	</a>
	<a class="flex flex-col items-center gap-1 text-on-surface-variant" href={resolve('/(authed)/admin/configuracion')}>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
		<span class="text-[10px] font-bold uppercase tracking-tighter">More</span>
	</a>
</nav>

<style>
	.sidebar-item-active[aria-current=true] {
		background-color: rgba(68, 102, 74, 0.1);
		color: #44664a;
		border-right: 3px solid #44664a;
	}
</style>
