import { db } from '$lib/server/db';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { workStatus } from '$lib/server/db/schema';
import { workStatusUpdateSchema } from '$lib/zod/schemas';
import { eq } from 'drizzle-orm';
import z from 'zod';


export const PUT: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const parsed = workStatusUpdateSchema.safeParse(body);

		if (!parsed.success) {
			return json(
				{ success: false, errors: z.flattenError(parsed.error).fieldErrors },
				{ status: 400 }
			);
		}

		const existing = await db
			.select()
			.from(workStatus)
			.where(eq(workStatus.id, parsed.data.id))
			.limit(1);

		if (existing.length === 0) {
			return json(
				{ success: false, errors: { general: ['Estatus de trabajo no encontrado'] } },
				{ status: 404 }
			);
		}

		const [updated] = await db
			.update(workStatus)
			.set({
				...parsed.data,
				updatedAt: new Date()
			})
			.where(eq(workStatus.id, parsed.data.id))
			.returning();

		return json({ success: true, data: updated });
	} catch (err) {
		console.error('Error al actualizar el estatus de trabajo:', err);
		throw error(500, 'Error al actualizar el estatus de trabajo');
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
			.from(workStatus)
			.where(eq(workStatus.id, id))
			.limit(1);

		if (existing.length === 0) {
			return json(
				{ success: false, errors: { general: ['Estatus de trabajo no encontrado'] } },
				{ status: 404 }
			);
		}

		await db.delete(workStatus).where(eq(workStatus.id, id));

		return json({ success: true, message: 'Estatus de trabajo eliminado correctamente' });
	} catch (err) {
		console.error('Error al eliminar el estatus de trabajo:', err);
		throw error(500, 'Error al eliminar el estatus de trabajo');
	}
}