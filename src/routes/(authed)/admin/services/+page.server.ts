import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { uploadImage } from "$lib/supabase/supabase";
import { serviceFormSchema, serviceUpdateSchema } from "$lib/zod/schemas";
import z from "zod";
import { v4 } from "uuid";
import type { loadServices } from "$lib/server/types/interfaces";


export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch("/api/services");
    const services: loadServices = await response.json();

    return services;
};


export const actions = {
    create: async ({ request, fetch }) => {
        const formData = await request.formData();
        const data = {
            name: formData.get("name"),
            description: formData.get("description"),
            image: formData.get("image"),
            active: formData.get("active") ? true : false,
        };

        const serviceValidation = serviceFormSchema.safeParse(data);

        if (!serviceValidation.success) {
            return fail(400, {
                fieldErrors: z.flattenError(serviceValidation.error).fieldErrors,
                data: {
                    name: formData.get("name"),
                    description: formData.get("description"),
                    active: formData.get("active") ? true : false,
                }
            });
        }

        const imageUploadedData = await uploadImage(serviceValidation.data.image, serviceValidation.data.name, serviceValidation.data.description);
    
        if (!imageUploadedData.success) {
            return fail(400, {
                errors: 'La imagen no se pudo subir al storage',
                data: {
                    name: formData.get("name"),
                    description: formData.get("description"),
                    active: formData.get("active") ? true : false,
                }
            });
        }

        const imageResponse = await fetch("/api/images", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                uuid: v4(),
                name: imageUploadedData.file_name,
                url: imageUploadedData.url,
                alt: imageUploadedData.short_description,
            })
        });


        if (!imageResponse.ok) {
            const error = await imageResponse.json();
            console.error('Error al crear servicio:', error);

            return fail(400, {
                errors: 'Error al crear servicio',
                data: {
                    name: formData.get("name"),
                    description: formData.get("description"),
                    active: formData.get("active") ? true : false,
                }
            });
        }

        const jsonImage = await imageResponse.json();                

        const response = await fetch("/api/services", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: serviceValidation.data.name,
                description: serviceValidation.data.description,
                imageUuid: jsonImage.data.id, 
                active: serviceValidation.data.active
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error al crear servicio:', error);

            return fail(400, {
                errors: 'Error al crear servicio',
                data: {
                    name: formData.get("name"),
                    description: formData.get("description"),
                    active: formData.get("active") ? true : false,
                }
            });
        }

        return { success: true };
    },

    update: async ({ request, fetch }) => {
        const formData = await request.formData();
        const data = {
            id: formData.get("id"),
            name: formData.get("name"),
            description: formData.get("description"),
            image: formData.get("image"),
            active: formData.get("active") ? true : false,
        };        

        const serviceValidation = serviceUpdateSchema.safeParse(data);

        if (!serviceValidation.success) {
            return fail(400, {
                fieldErrors: z.flattenError(serviceValidation.error).fieldErrors,
                data: {
                    name: formData.get("name"),
                    description: formData.get("description"),
                    active: formData.get("active") ? true : false,
                }
            });
        }

        let imageId: number = 0;
        if(serviceValidation.data.image && serviceValidation.data.name && serviceValidation.data.description){
            const imageUploadedData = await uploadImage(serviceValidation.data.image, serviceValidation.data.name, serviceValidation.data.description);
    
            if (!imageUploadedData.success) {
                return fail(400, {
                    errors: 'La imagen no se pudo subir al storage',
                    data: {
                        name: formData.get("name"),
                        description: formData.get("description"),
                        active: formData.get("active") ? true : false,
                    }
                });
            }

            const imageResponse = await fetch("/api/images", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    uuid: v4(),
                    name: imageUploadedData.file_name,
                    url: imageUploadedData.url,
                    alt: imageUploadedData.short_description,
                })
            });


            if (!imageResponse.ok) {
                const error = await imageResponse.json();
                console.error('Error al actualizar la imagen del servicio:', error);

                return fail(400, {
                    errors: 'Error al actualizar la imagen del servicio',
                    data: {
                        name: formData.get("name"),
                        description: formData.get("description"),
                        active: formData.get("active") ? true : false,
                    }
                });
            }

            const jsonResponse = await imageResponse.json();
            imageId = jsonResponse.data.id
        }        

        const response = await fetch(`/api/services/${data.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: serviceValidation.data.id,
                name: serviceValidation.data.name,
                description: serviceValidation.data.description,
                imageUuid: imageId !== 0 ? imageId : undefined, 
                active: serviceValidation.data.active
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error al actualizar el servicio:', error);

            return fail(400, {
                errors: 'Error al actualizar el servicio',
                data: {
                    name: formData.get("name"),
                    description: formData.get("description"),
                    active: formData.get("active") ? true : false,
                }
            });
        }

        return { success: true };
    },

    delete: async ({ request, fetch }) => {
        const formData = await request.formData();
        const id = formData.get("id");

        const response = await fetch(`/api/services/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            return fail(500, { error: "Error al eliminar" });
        }

        return { success: true };
    }
} satisfies Actions;