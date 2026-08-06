<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navigation from '$lib/components/Navigation.svelte';

	let { children, data  } = $props();
</script>


<Navigation session={data.session}/>

{@render children()}

<Footer />
