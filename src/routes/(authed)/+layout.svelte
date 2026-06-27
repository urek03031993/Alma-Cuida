<script>
	import AdminSidebar from "$lib/components/AdminSidebar.svelte";

    let { children } = $props();
</script>

<div class="min-h-screen flex font-body-md text-body-md overflow-x-hidden">

<AdminSidebar/>

{@render children()}

</div>


