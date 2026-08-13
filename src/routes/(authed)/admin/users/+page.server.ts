import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";
import type { loadUsers } from "$lib/server/types/interfaces";
import { userSchema, userUpdateSchema } from "$lib/zod/schemas.js";
import z from "zod";


export const load: PageServerLoad = async ({ fetch }) => {
    const usersFetch = await fetch("/api/users");
    const users: loadUsers = await usersFetch.json();

    return users
};


export const actions = {
    create: async ({ request }) => {
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
    },
    update: async ({ request, fetch }) => {
        const formData = await request.formData();
        const data = {
            id: formData.get("id"),
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password")
        }         

        const serviceValidation = userUpdateSchema.safeParse(data);

        if (!serviceValidation.success) {
            return fail(400, {
                fieldErrors: z.flattenError(serviceValidation.error).fieldErrors,
                data: {
                    name: formData.get("name"),
                    email: formData.get("email"),
                }
            });
        }    

        const response = await fetch(`/api/users/${data.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: serviceValidation.data.id,
                name: serviceValidation.data.name,
                email: serviceValidation.data.email,
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error al actualizar el usuario:', error);

            return fail(400, {
                errors: 'Error al actualizar el usuario',
                data: {
                    name: formData.get("name"),
                    email: formData.get("email"),
                }
            });
        }

        return { success: true };
    },    
    // delete: async ({ request }) => {
    //     const formData = await request.formData();
    //     const id = formData.get("id");

    //     console.log("ID a eliminar:", id);
       


    //     const result = await auth.api.removeUser({
    //         body: {
    //             userId: id,
    //     }});


    //     if (result.success) {
    //         return fail(500, { error: "Error al eliminar" });
    //     }

    //     return { success: true };
    // }
} satisfies Actions;