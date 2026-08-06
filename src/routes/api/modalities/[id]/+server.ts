import { db } from '$lib/server/db';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { modalitie } from '$lib/server/db/schema';
import { modalitUpdateSchema } from '$lib/zod/schemas';
import { eq } from 'drizzle-orm';
import z from 'zod';


export const PUT: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        const parsed = modalitUpdateSchema.safeParse(body);

        if (!parsed.success) {
            return json(
                { success: false, errors: z.flattenError(parsed.error).fieldErrors },
                { status: 400 }
            );
        }

        const existing = await db
            .select()
            .from(modalitie)
            .where(eq(modalitie.id, parsed.data.id))
            .limit(1);

        if (existing.length === 0) {
            return json(
                { success: false, errors: { general: ['Modalidad no encontrado'] } },
                { status: 404 }
            );
        }

        // if (parsed.data.imageUuid) {
        // 	const imgExists = await db
        // 		.select({ id: image.id })
        // 		.from(image)
        // 		.where(eq(image.id, parsed.data.imageUuid))
        // 		.limit(1);

        // 	if (imgExists.length === 0) {
        // 		return json(
        // 			{ success: false, errors: { imageUuid: ['La imagen no existe'] } },
        // 			{ status: 400 }
        // 		);
        // 	}
        // }

        const [updated] = await db
            .update(modalitie)
            .set({
                ...parsed.data,
                updatedAt: new Date()
            })
            .where(eq(modalitie.id, parsed.data.id))
            .returning();

        return json({ success: true, data: updated });
    } catch (err) {
        console.error('Error al actualizar la modalidad:', err);
        throw error(500, 'Error al actualizar la modalidad');
    }
}


export const DELETE: RequestHandler = async ({ params }) => {
    try {		
        const id = parseInt(params.id)

        if (!id || isNaN(id) || id <= 0) {
            return json(
                { success: false, errors: { id: ['ID inválido'] } },
                { status: 400 }
            );
        }

        const existing = await db
            .select()
            .from(modalitie)
            .where(eq(modalitie.id, id))
            .limit(1);

        if (existing.length === 0) {
            return json(
                { success: false, errors: { general: ['Modalidad no encontrado'] } },
                { status: 404 }
            );
        }

        await db.delete(modalitie).where(eq(modalitie.id, id));

        return json({ success: true, message: 'Modalidad eliminada correctamente' });
    } catch (err) {
        console.error('Error al eliminar la modalidad:', err);
        throw error(500, 'Error al eliminar la modalidad');
    }
}