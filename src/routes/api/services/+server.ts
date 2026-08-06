import { db } from '$lib/server/db';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { service } from '$lib/server/db/schema';
import { serviceApiSchema } from '$lib/zod/schemas';
import z from 'zod';


export const GET: RequestHandler = async () => {
	try {		
		const services = await db.query.service.findMany({
			columns: {
				id: true,
				name: true,
				description: true,
				active: true,
				imageUuid: true,
				createdAt: true,
				updatedAt: true,
			},
			with: {
				image: {
					columns: {
						id: true,
						name: true,
						url: true,
						alt: true,
						createdAt: true,
						updatedAt: true
					}
				}
			}
		});

		return json({ success: true, data: services });
	} catch (err) {
		console.error('Error al obtener servicios:', err);
		throw error(500, 'Error al obtener los servicios');
	}
};


export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();		
		const data_validated = serviceApiSchema.safeParse(body);

		if (!data_validated.success) {
			return json(
				{ success: false, errors: z.flattenError(data_validated.error).fieldErrors },
				{ status: 400 }
			);
		}		

		const [newService] = await db
			.insert(service)
			.values({
				name: data_validated.data.name,
				description: data_validated.data.description ?? null,
				imageUuid: data_validated.data.imageUuid,
				active: data_validated.data.active,
			})
			.returning();

		return json({ success: true, data: newService }, { status: 201 });
	} catch (err) {
		console.error('Error al crear servicio:', err);
		throw error(500, 'Error al crear el servicio');
	}
}
