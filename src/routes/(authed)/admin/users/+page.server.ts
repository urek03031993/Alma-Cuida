import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";
import type { loadUsers } from "$lib/server/types/interfaces";
import { userSchema } from "$lib/zod/schemas.js";
import z from "zod";


export const load: PageServerLoad = async ({ fetch }) => {
    const usersFetch = await fetch("/api/users");
    const users: loadUsers = await usersFetch.json();

    return users
};


export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password")
        }        

        const data_validated = userSchema.safeParse(data);

        if (!data_validated.success) {
            return fail(400, {
                fieldErrors: z.flattenError(data_validated.error).fieldErrors,
                data: {
                    name: formData.get("name"),
                    email: formData.get("email"),
                }
            });
        }

        const name = data_validated.data.name
        const email = data_validated.data.email
        const password = data_validated.data.password

        const signUpResponse = await auth.api.signUpEmail({
            body: { name, email, password },
        });

        if(!signUpResponse.token){
            return { success: false };
        }

        return { success: true };
    }
} satisfies Actions;