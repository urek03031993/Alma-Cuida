import { db } from '$lib/server/db';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { modalitie } from '$lib/server/db/schema';
import { modalitySchema } from '$lib/zod/schemas';
import z from 'zod';


export const GET: RequestHandler = async () => {
    try {
        const modalities = await db
            .select({
                id: modalitie.id,
                name: modalitie.name,
                description: modalitie.description,
                serviceId: modalitie.serviceId,
                basePrice: modalitie.basePrice,
                active: modalitie.active,
                createdAt: modalitie.createdAt,
                updatedAt: modalitie.updatedAt,				
            })
            .from(modalitie)
            .orderBy(modalitie.id);

        return json({ success: true, data: modalities });
    } catch (err) {
        console.error('Error al obtener las modalidades:', err);
        throw error(500, 'Error al obtener los modalidades');
    }
};


export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();		
        const data_validated = modalitySchema.safeParse(body);

        if (!data_validated.success) {
            return json(
                { success: false, errors: z.flattenError(data_validated.error).fieldErrors },
                { status: 400 }
            );
        }

        // Validar que la imagen exista si se proporciona
        // if (data_validated.data.imageUuid) {
        // 	const imgExists = await db
        // 		.select({ id: image.id })
        // 		.from(image)
        // 		.where(eq(image.id, data_validated.data.imageUuid))
        // 		.limit(1);

        // 	if (imgExists.length === 0) {
        // 		return json(
        // 			{ success: false, errors: { imageUuid: ['La imagen no existe'] } },
        // 			{ status: 400 }
        // 		);
        // 	}
        // }

        const [newModality] = await db
            .insert(modalitie)
            .values({
                name: data_validated.data.name,
                description: data_validated.data.description ?? '',
                serviceId: data_validated.data.serviceId,
                basePrice: data_validated.data.basePrice ?? 0.00,
                active: data_validated.data.active,
            })
            .returning();

        return json({ success: true, data: newModality }, { status: 201 });
    } catch (err) {
        console.error('Error al crear la modalidad:', err);
        throw error(500, 'Error al crear la modalidad');
    }
}
