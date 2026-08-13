import { db } from '$lib/server/db';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { service } from '$lib/server/db/schema';
import { serviceApiUpdateSchema } from '$lib/zod/schemas';
import { eq } from 'drizzle-orm';
import z from 'zod';



export const GET: RequestHandler = async ({ params }) => {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return json({ message: 'invalid ID '}, { status: 400 });
		}

		const serviceSelect = await db.query.service.findFirst({
			where: eq(service.id, id),
			columns: {
				id: true,
				name: true,
				description: true,
				imageUuid: true,
				main: true,
				active: true,
				createdAt: true,
				updatedAt: true
			},
			with: {
				image: {
					columns: {
						id: true,
						name: true,
						url: true,
						uuid: true,
						alt: true,
						createdAt: true,
						updatedAt: true
					}
				},
				modalities: {
					columns: {
						id: true,
						name: true,
						description: true,
						active: true,
						createdAt: true,
						updatedAt: true
					}
				}
			}
		});

		if (!serviceSelect) {
			return json('Service not found', { status: 404 });
		}
		
		return json(serviceSelect, { status: 200 });						
		
	}catch (error) {
		console.error('Error fetching service:', error);
		return json({ error: 'Failed to fetch service' }, { status: 500 });
	}
};


export const PUT: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const parsed = serviceApiUpdateSchema.safeParse(body);

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