import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { selectClient } from "$lib/server/types/interfaces";

interface loadClients {
    success: boolean;
    data: selectClient[];
}


export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch("/api/clients");
    const clients: loadClients = await response.json();

    return clients;
};


export const actions = {
    create: async ({ request, fetch }) => {
        const formData = await request.formData();
        const data = {
            name: formData.get("name"),
            description: formData.get("description"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            IdDocument: formData.get("IdDocument"),
            birthDate: formData.get("birthDate"),
            active: formData.get("active") ? true : false,
        };

        const response = await fetch("/api/clients", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error al crear los clientes:', error);
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
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            IdDocument: formData.get("IdDocument"),
            birthDate: formData.get("birthDate"),
            active: formData.get("active") ? true : false,
        };

        const response = await fetch(`/api/clients/${data.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error al editar el cliente:', error);
            return fail(400, { error: error.message });
        }

        return { success: true };
    },

    delete: async ({ request, fetch }) => {
        const formData = await request.formData();
        const id = formData.get("id");

        const response = await fetch(`/api/clients/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            return fail(500, { error: "Error al eliminar" });
        }

        return { success: true };
    }
} satisfies Actions;