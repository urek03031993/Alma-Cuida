import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { resolve } from "$app/paths";


export const load: LayoutServerLoad = async ({ locals }) => {
    const session = locals.session;    

    if (!session) {
        redirect(303, resolve("/(app)"));
    }    

    return { session };
};

