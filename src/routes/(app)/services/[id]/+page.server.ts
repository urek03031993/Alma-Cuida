import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import type { loadFullService } from "$lib/server/types/interfaces";



export const load: PageServerLoad = async ({ fetch, params }) => {
    const id = params.id;

    if (!id || isNaN(Number(id))) {
        error(400, "Invalid service ID");
    }

    const response = await fetch(`/api/services/${params.id}`);
    const service: loadFullService = await response.json();

    return { service };
};
