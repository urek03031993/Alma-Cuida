import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { selectModality, selectService } from "$lib/server/types/interfaces";
import { modalitySchema, modalitUpdateSchema } from "$lib/zod/schemas";
import z from "zod";

interface loadModality {
    success: boolean;
    data: selectModality[];
}

interface loadServices {
    success: boolean;
    data: selectService[];
}


export const load: PageServerLoad = async ({ fetch }) => {
    const servicesFetch = await fetch("/api/services");
    const modalitiesFetch = await fetch("/api/modalities");

    const services: loadServices = await servicesFetch.json();
    const modalities: loadModality = await modalitiesFetch.json();

    return { modalities , services };
};


export const actions = {
    create: async ({ request, fetch }) => {
        const formData = await request.formData();
        const data = {
            name: formData.get("name"),
            description: formData.get("description"),
            serviceId: formData.get("serviceId"),
            basePrice: formData.get("basePrice") ?? 0.00,
            active: formData.get("active") ? true : false,
        };

        const data_validated = modalitySchema.safeParse(data);

        if (!data_validated.success) {
            return fail(400, { success: false, errors: z.flattenError(data_validated.error).fieldErrors });
        }

        const response = await fetch("/api/modalities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error al crear la modalidad:', error);
            return fail(400, { error: error.message });
        }

        return { success: true };
    },

    update: async ({ request, fetch }) => {
        const formData = await request.formData();
        const data = {
            id: formData.get("id"),
            name: formData.get("name"),
            description: formData.get("description"),
            serviceId: formData.get("serviceId"),
            basePrice: formData.get("basePrice") ?? 0.00,
            active: formData.get("active") ? true : false,
        };

        const data_validated = modalitUpdateSchema.safeParse(data);

        if (!data_validated.success) {
            return fail(400, { success: false, errors: z.flattenError(data_validated.error).fieldErrors });
        }

        const response = await fetch(`/api/modalities/${data.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error al editar la modalidad:', error);
            return fail(400, { error: error.message });
        }

        return { success: true };
    },

    delete: async ({ request, fetch }) => {
        const formData = await request.formData();
        const id = formData.get("id");

        const response = await fetch(`/api/modalities/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            return fail(500, { error: "Error al eliminar" });
        }

        return { success: true };
    }
} satisfies Actions;