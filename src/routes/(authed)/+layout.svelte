<script>
	import AdminSidebar from "$lib/components/AdminSidebar.svelte";

    let { children } = $props();
</script>

<div class="min-h-screen flex font-body-md text-body-md overflow-x-hidden">
    <AdminSidebar/>
    <main class="flex-1 md:ml-72 bg-cream min-h-screen p-margin-mobile md:p-12 pb-24">
        {@render children()}
    </main>
</div>


