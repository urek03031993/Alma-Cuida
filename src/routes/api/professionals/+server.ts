import { db } from '$lib/server/db';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { professionals } from '$lib/server/db/schema';
import { professionalSchema } from '$lib/zod/schemas';
import z from 'zod';


export const GET: RequestHandler = async () => {
	try {
		const professional = await db
			.select({
				id: professionals.id,
				name: professionals.name,
				lastName: professionals.lastName,
				email: professionals.email,
				phone: professionals.phone,
				address: professionals.address,
				IdDocument: professionals.IdDocument,
				driverLicense: professionals.driverLicense,
				experience: professionals.experience,
				certifications: professionals.certifications,
				workStatus: professionals.workStatus,
				status: professionals.status,
				description: professionals.description,
				createdAt: professionals.createdAt,
				updatedAt: professionals.updatedAt,
			})
			.from(professionals)
			.orderBy(professionals.id);

		return json({ success: true, data: professional });
	} catch (err) {
		console.error('Error al obtener los professionales:', err);
		throw error(500, 'Error al obtener los professionales');
	}
};


export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();		
		const data_validated = professionalSchema.safeParse(body);

		if (!data_validated.success) {
			return json(
				{ success: false, errors: z.flattenError(data_validated.error).fieldErrors },
				{ status: 400 }
			);
		}

		const [newProfessional] = await db
			.insert(professionals)
			.values({
				name: data_validated.data.name,				
				lastName: data_validated.data.lastName,
				email: data_validated.data.email,
				phone: data_validated.data.phone,
				address: data_validated.data.address ?? null,
				IdDocument: data_validated.data.IdDocument ?? null,

				description: data_validated.data.description ?? null,
			})
			.returning();

		return json({ success: true, data: newProfessional }, { status: 201 });
	} catch (err) {
		console.error('Error al crear servicio:', err);
		throw error(500, 'Error al crear el servicio');
	}
}
