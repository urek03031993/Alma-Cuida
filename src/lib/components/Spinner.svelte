<script lang="ts">
	import { fade } from "svelte/transition";

    // import { loading } from '$lib/stores/store';
</script>

<div class="bg-background text-on-background font-body overflow-hidden" transition:fade>
    <main class="relative w-full h-screen flex flex-col items-center justify-center p-gutter">
        <div class="absolute top-5 left-0 w-full flex justify-center animate-fade-in"
            style="animation-delay: 0.2s;">
            <h1 class="font-headline-md text-headline-md font-extrabold sage-dark brand-letter-spacing uppercase">
                ALMA CUIDA
            </h1>
        </div>
        <div class="flex flex-col items-center justify-center space-y-6 max-w-sm w-full">
            <div class="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                <div class="w-full h-full" id="animated-svg-ANIMATION_14" style="display:block;">
                    <svg class="w-16 h-16" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle
                            cx="50"
                            cy="50"
                            fill="none"
                            opacity="0.3"
                            r="40"
                            stroke="#E8DFC8"
                            stroke-linecap="round"
                            stroke-width="8"
                        ></circle>
                        <circle
                            cx="50"
                            cy="50"
                            fill="none"
                            r="40"
                            stroke="#7A9E7E"
                            stroke-dasharray="180 200"
                            stroke-linecap="round"
                            stroke-width="8"
                        >
                            <animatetransform
                                attributename="transform"
                                dur="1.5s"
                                from="0 50 50"
                                repeatcount="indefinite"
                                to="360 50 50"
                                type="rotate"
                            ></animatetransform>
                        </circle>
                        <path
                            d="M50 30 L50 45 M50 55 L50 70 M30 50 L45 50 M55 50 L70 50"
                            opacity="0.5"
                            stroke="#7A9E7E"
                            stroke-linecap="round"
                            stroke-width="2"
                        >
                            <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="0.2;0.8;0.2"
                            ></animate>
                        </path>
                    </svg>
                </div>
            </div>
            <div class="text-center space-y-4 animate-fade-in" style="animation-delay: 0.6s;">
                <p class="font-body-md text-body-md text-primary-container font-medium">
                    Preparando tu experiencia...
                </p>
                <div class="flex justify-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse"></span>
                    <span
                        class="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse"
                        style="animation-delay: 0.2s;"
                    ></span>
                    <span
                        class="w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse"
                        style="animation-delay: 0.4s;"
                    ></span>
                </div>
            </div>
        </div>
    </main>    
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade-in {
		animation: fadeIn 1.2s ease-out forwards;
	}
	.brand-letter-spacing {
		letter-spacing: 0.25em;
	}
</style>
