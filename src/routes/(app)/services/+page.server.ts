import type { PageServerLoad } from "./$types";
import type { loadServices } from "$lib/server/types/interfaces";


export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch("/api/services");
    const services: loadServices = await response.json();

    return services;
};
