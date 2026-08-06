import { db } from '$lib/server/db';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { image } from '$lib/server/db/schema';
import { imageApiSchema } from '$lib/zod/schemas';
import z from 'zod';


export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();		
        const data_validated = imageApiSchema.safeParse(body);

        if (!data_validated.success) {
            return json(
                { success: false, errors: z.flattenError(data_validated.error).fieldErrors },
                { status: 400 }
            );
        }		

        const [newImage] = await db
            .insert(image)
            .values({
                uuid: data_validated.data.uuid,
                name: data_validated.data.name,
                url: data_validated.data.url,
                alt: data_validated.data.alt,
            })
            .returning();

        return json({ success: true, data: newImage }, { status: 201 });
    } catch (err) {
        console.error('Error al crear la imagen:', err);
        error(500, 'Error al crear la imagen');
    }
}