import { db } from '$lib/server/db';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { service } from '$lib/server/db/schema';
import { serviceUpdateSchema } from '$lib/zod/schemas';
import { eq } from 'drizzle-orm';
import z from 'zod';


export const PUT: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const parsed = serviceUpdateSchema.safeParse(body);

		if (!parsed.success) {
			return json(
				{ success: false, errors: z.flattenError(parsed.error).fieldErrors },
				{ status: 400 }
			);
		}

		const existing = await db
			.select()
			.from(service)
			.where(eq(service.id, parsed.data.id))
			.limit(1);

		if (existing.length === 0) {
			return json(
				{ success: false, errors: { general: ['Servicio no encontrado'] } },
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
			.update(service)
			.set({
				...parsed.data,
				updatedAt: new Date()
			})
			.where(eq(service.id, parsed.data.id))
			.returning();

		return json({ success: true, data: updated });
	} catch (err) {
		console.error('Error al actualizar servicio:', err);
		throw error(500, 'Error al actualizar el servicio');
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
			.from(service)
			.where(eq(service.id, id))
			.limit(1);

		if (existing.length === 0) {
			return json(
				{ success: false, errors: { general: ['Servicio no encontrado'] } },
				{ status: 404 }
			);
		}

		await db.delete(service).where(eq(service.id, id));

		return json({ success: true, message: 'Servicio eliminado correctamente' });
	} catch (err) {
		console.error('Error al eliminar servicio:', err);
		throw error(500, 'Error al eliminar el servicio');
	}
}