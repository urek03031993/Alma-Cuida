import { db } from '$lib/server/db';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { service, client} from '$lib/server/db/schema';
import { clientSchema } from '$lib/zod/schemas';
import z from 'zod';


export const GET: RequestHandler = async () => {
	try {
		const clients = await db
			.select({
				id: client.id,
				name: client.name,
				lastName: client.lastName,
				email: client.email,
				phone: client.phone,
				address: client.address,
				IdDocument: client.IdDocument,
				birthDate: client.birthDate,
				description: client.description,
				active: service.active,
				createdAt: service.createdAt,
				updatedAt: service.updatedAt,				
			})
			.from(client)
			.orderBy(client.id);

		return json({ success: true, data: clients });
	} catch (err) {
		console.error('Error al obtener clientes:', err);
		throw error(500, 'Error al obtener los clientes');
	}
};


export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();		
		const data_validated = clientSchema.safeParse(body);

		if (!data_validated.success) {
			return json(
				{ success: false, errors: z.flattenError(data_validated.error).fieldErrors },
				{ status: 400 }
			);
		}

		const [newClient] = await db
			.insert(client)
			.values({
				name: data_validated.data.name,				
				lastName: data_validated.data.lastName,
				email: data_validated.data.email,
				phone: data_validated.data.phone,
				address: data_validated.data.address ?? null,
				IdDocument: data_validated.data.IdDocument ?? null,
				birthDate: data_validated.data.birthDate ?? null,
				description: data_validated.data.description ?? null,
				active: data_validated.data.active,
			})
			.returning();

		return json({ success: true, data: newClient }, { status: 201 });
	} catch (err) {
		console.error('Error al crear servicio:', err);
		throw error(500, 'Error al crear el servicio');
	}
}
