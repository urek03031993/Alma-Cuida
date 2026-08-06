<script lang="ts">
    import { browser } from '$app/environment';

    interface Props {
        name: string;
        description: string;
        delay: number;
    }

    let { name, description, delay }: Props = $props();

    let cardRef: HTMLElement;
    let isVisible = $state(false);

    $effect(() => {
        if (!browser || !cardRef) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    isVisible = true;
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(cardRef);
        return () => observer.disconnect();
    });
</script>


<div bind:this={cardRef} class="glass-card p-10 rounded-3xl group {isVisible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-12'}" 
                                style="transition-delay: {delay}ms">
  <h3 class="font-headline-md text-headline-md text-primary mb-4">{name}</h3>
    <p class="text-on-surface-variant mb-6">
        {description}
    </p>
</div>

<style>
    .glass-card {
		background: rgba(232, 223, 200, 0.4);
		backdrop-filter: blur(16px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		transition:
			transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
			box-shadow 0.3s ease;
		perspective: 1000px;
	}
	.glass-card:hover {
		transform: translateY(-8px) rotateX(2deg) rotateY(2deg);
		box-shadow: 0 20px 40px rgba(100, 94, 76, 0.15);
	}
</style>