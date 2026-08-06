import { db } from '$lib/server/db';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { client } from '$lib/server/db/schema';
import { clientUpdateSchema } from '$lib/zod/schemas';
import { eq } from 'drizzle-orm';
import z from 'zod';


export const PUT: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const parsed = clientUpdateSchema.safeParse(body);

		if (!parsed.success) {
			return json(
				{ success: false, errors: z.flattenError(parsed.error).fieldErrors },
				{ status: 400 }
			);
		}

		const existing = await db
			.select()
			.from(client)
			.where(eq(client.id, parsed.data.id))
			.limit(1);

		if (existing.length === 0) {
			return json(
				{ success: false, errors: { general: ['Cliente no encontrado'] } },
				{ status: 404 }
			);
		}

		const [clientUpdated] = await db
			.update(client)
			.set({
				...parsed.data,
				updatedAt: new Date()
			})
			.where(eq(client.id, parsed.data.id))
			.returning();

		return json({ success: true, data: clientUpdated });
	} catch (err) {
		console.error('Error al actualizar el cliente:', err);
		throw error(500, 'Error al actualizar el cliente');
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
			.from(client)
			.where(eq(client.id, id))
			.limit(1);

		if (existing.length === 0) {
			return json(
				{ success: false, errors: { general: ['Cliente no encontrado'] } },
				{ status: 404 }
			);
		}

		await db.delete(client).where(eq(client.id, id));

		return json({ success: true, message: 'Cliente eliminado correctamente' });
	} catch (err) {
		console.error('Error al eliminar el cliente:', err);
		throw error(500, 'Error al eliminar el cliente');
	}
}