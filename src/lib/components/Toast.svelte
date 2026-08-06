<script lang="ts">
    let {type, description } = $props();
</script>


<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
	<div class="space-y-6">
		<div class="toast-entrance flex items-center gap-4 bg-white/80 backdrop-blur-xl border-l-4 border-sage-dark p-5 rounded-lg shadow-lg">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big-icon lucide-circle-check-big text-sage-dark"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>
			<div class="flex-1">
				<h4 class="font-label-md text-sage-dark">Success</h4>
				<p class="text-on-surface-variant text-sm">
					Your visit has been successfully scheduled for June 12th.
				</p>
			</div>
			<button class="text-outline hover:text-on-surface transition-colors" aria-label="close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
		</div>
		<div class="toast-entrance flex items-center gap-4 bg-white/80 backdrop-blur-xl border-l-4 border-error p-5 rounded-lg shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert-icon lucide-circle-alert text-error"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
			<div class="flex-1">
				<h4 class="font-label-md text-error">System Error</h4>
				<p class="text-on-surface-variant text-sm">
					We're unable to process the request at this time. Please try again.
				</p>
			</div>
			<button class="text-outline hover:text-on-surface transition-colors" aria-label="close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
		</div>
		<div class="toast-entrance flex items-center gap-4 bg-white/80 backdrop-blur-xl border-l-4 border-amber-300 p-5 rounded-lg shadow-lg">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert-icon lucide-triangle-alert text-amber-300"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
			<div class="flex-1">
				<h4 class="font-label-md text-secondary">Warning</h4>
				<p class="text-on-surface-variant text-sm">
					Only two private suites remain for the fall season.
				</p>
			</div>
			<button class="text-outline hover:text-on-surface transition-colors" aria-label="close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
		</div>
		<div class="toast-entrance flex items-center gap-4 bg-white/80 backdrop-blur-xl border-l-4 border-sage-light p-5 rounded-lg shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info text-sage-light"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
			<div class="flex-1">
				<h4 class="font-label-md text-sage-light">Information</h4>
				<p class="text-on-surface-variant text-sm">
					Our dining hall is now serving seasonal summer refreshments.
				</p>
			</div>
			<button class="text-outline hover:text-on-surface transition-colors" aria-label="close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
		</div>
	</div>
</div>
