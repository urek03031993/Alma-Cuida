 <script lang="ts">
    let passwordVisibility = $state(false);

    function changePasswordVisibility(){
        passwordVisibility = !passwordVisibility;
    }
</script>

<main class="flex min-h-screen w-full bg-background font-body-md text-on-background overflow-hidden">
	<section class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-surface-container-high">
		<div class="absolute inset-0 z-0">
			<img alt=""
				class="w-full h-full object-cover"
				data-alt="A luxurious and serene architectural photograph of a high-end senior residential interior. The space features floor-to-ceiling windows letting in soft morning light, warm oak wood flooring, and minimalist furniture in shades of crema and sage. Lush green plants are visible through the glass, creating a seamless connection with nature. The atmosphere is quiet, airy, and premium, reflecting a lifestyle of luminous tranquility and professional care."
				src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm5-PvOXHDdCpVFSPV9W8louofT5Phf1Cx0roQIqqv2umJiykWy4YA1UHfPeJYo9Y9FTCNjFZrWIFX1B3o3FEOX7x1jdrQHRiYENYp3ORRx8XtH6pMgmdxfqpHXnjo9Fxlog_O-XzN63rq2CtCXVVdwwOcDlv_lvkYw0QumMZcqseUI024Bw-B4QVBUuJtCzvHMRMlj6s4hoeFIPnJ04WG4J-Xq7vttA7KxrrFFy0JqWceaNIEvqy6RA"
			/>
		</div>
		<div class="absolute inset-0 bg-linear-to-t from-primary/30 to-transparent mix-blend-multiply"></div>
		<div class="relative z-10 flex flex-col justify-end p-margin-desktop w-full h-full text-on-primary">
			<div class="glass-effect p-gutter rounded-xl max-w-md animate-fade-in">
				<h2 class="font-headline-lg text-headline-lg mb-2">Calidez en cada servicio</h2>
				<p class="font-body-md text-body-md opacity-90">
					Un espacio diseñado para servir con plenitud y el cuidado al adulto mayor.
				</p>
			</div>
		</div>
	</section>

	<section class="w-full lg:w-1/2 flex items-center justify-center bg-[#FAF9F6] p-margin-mobile md:p-margin-desktop relative">
		<div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
		<div class="absolute bottom-0 left-0 w-96 h-96 bg-secondary-container/20 rounded-full blur-[120px] -ml-48 -mb-48"></div>
		<div class="w-full max-w-md z-10 perspective-container">
			<div class="hover-3d login-card-shadow bg-surface-container-lowest/80 backdrop-blur-md p-8 md:p-12 rounded-xl border border-white/40">
				<div class="text-center mb-10">
					<span class="font-headline-md text-headline-md text-sage-dark tracking-tight font-bold uppercase">alma cuida</span>
					<div class="mt-8 flex flex-col gap-2">
						<h1 class="font-headline-lg text-headline-lg text-on-surface">Bienvenido</h1>
						<p class="font-body-md text-body-md text-on-surface-variant">
							Ingresa a tu cuenta para gestionar el cuidado y bienestar.
						</p>
					</div>
				</div>
				<form class="space-y-6" method="POST">
					<div class="space-y-2">
						<label class="font-label-md text-label-md text-secondary uppercase tracking-wider" for="email">Correo Electrónico</label>
						<div class="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail absolute left-4 top-1/2 -translate-y-1/2 text-outline"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
							<input
								class="premium-input w-full h-14 pl-12 pr-4 rounded-lg font-body-md text-body-md text-on-surface"
								id="email"
								name="email"
								placeholder="nombre@ejemplo.com"
								required
								type="email"
							/>
						</div>
					</div>
					<div class="space-y-2">
						<div class="flex justify-between items-end">
							<label class="font-label-md text-label-md text-secondary uppercase tracking-wider" for="password">Contraseña</label>
							<!-- <a class="text-label-md font-label-md text-primary hover:text-primary-container transition-colors" href="#as">
                                ¿Olvidaste tu contraseña?
                            </a> -->
						</div>
						<div class="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-key-round-icon lucide-key-round absolute left-4 top-1/2 -translate-y-1/2 text-outline"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/></svg>
							<input
								class="premium-input w-full h-14 pl-12 pr-12 rounded-lg font-body-md text-body-md text-on-surface"
								id="password"
								name="password"
								placeholder="••••••••"
								required
								type={passwordVisibility ? "text" : "password"}
							/>
							<button
								class="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
								type="button"
                                onclick={changePasswordVisibility}
							>
                                {#if !passwordVisibility}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                                {:else}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>                                    
                                {/if}
							</button>
						</div>
					</div>
					<div class="pt-4">
						<button
							class="w-full h-14 bg-sage-dark text-white font-label-md text-label-md rounded-lg shadow-lg hover:shadow-primary-container/20 hover:scale-[1.01] active:scale-100 transition-all duration-300 flex items-center justify-center gap-2"
							type="submit"
						>
							Iniciar Sesión
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-keyhole-open-icon lucide-lock-keyhole-open"><circle cx="12" cy="16" r="1"/><rect width="18" height="12" x="3" y="10" rx="2"/><path d="M7 10V7a5 5 0 0 1 9.33-2.5"/></svg>
						</button>
					</div>
				</form>
				<div class="mt-10 pt-8 border-t border-outline-variant/30 text-center">
					<!-- <p class="font-body-md text-body-md text-on-surface-variant mb-4">
						¿No tienes una cuenta aún?
					</p> -->
					<a class="inline-flex items-center gap-2 font-label-md text-label-md text-primary hover:text-primary-container font-bold transition-all"
                       href="#as"
					>
						Solicitar acceso para familias o personal
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-lock-icon lucide-file-lock"><path d="M4 9.8V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M9 17v-2a2 2 0 0 0-4 0v2"/><rect width="8" height="5" x="3" y="17" rx="1"/></svg>
					</a>
				</div>
			</div>
			<!-- <div class="mt-8 flex justify-center gap-6">
				<a
					class="text-label-md font-label-md text-outline hover:text-primary transition-colors"
					href="#as">Privacidad</a
				>
				<a
					class="text-label-md font-label-md text-outline hover:text-primary transition-colors"
					href="#asd">Ayuda</a
				>
				<a
					class="text-label-md font-label-md text-outline hover:text-primary transition-colors"
					href="#asd">Contacto</a
				>
			</div> -->
		</div>
	</section>
</main>

<style>
	.glass-effect {
		background: rgba(232, 223, 200, 0.4);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.premium-input {
		background-color: #f2f0ea;
		border: 1px solid transparent;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.premium-input:focus {
		background-color: #ffffff;
		border-color: #7a9e7e;
		box-shadow: 0 0 0 4px rgba(122, 158, 126, 0.1);
		outline: none;
	}

	.login-card-shadow {
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
	}

	.perspective-container {
		perspective: 1000px;
	}

	.hover-3d {
		transition: transform 0.5s ease-out;
		transform-style: preserve-3d;
	}

	.hover-3d:hover {
		transform: rotateX(1deg) rotateY(-1deg);
	}
</style>
