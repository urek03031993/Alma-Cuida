import { db } from '$lib/server/db';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { workStatus } from '$lib/server/db/schema';
import { workStatusSchema } from '$lib/zod/schemas';
import z from 'zod';


export const GET: RequestHandler = async () => {
	try {
		const works = await db
			.select({
				id: workStatus.id,
				name: workStatus.name,
				description: workStatus.description,
				createdAt: workStatus.createdAt,
				updatedAt: workStatus.updatedAt,				
			})
			.from(workStatus)
			.orderBy(workStatus.id);

		return json({ success: true, data: works });
	} catch (err) {
		console.error('Error al obtener los estatus de trabajo:', err);
		throw error(500, 'Error al obtener los estatus de trabajo');
	}
};


export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();		
		const data_validated = workStatusSchema.safeParse(body);

		if (!data_validated.success) {
			return json(
				{ success: false, errors: z.flattenError(data_validated.error).fieldErrors },
				{ status: 400 }
			);
		}

		const [newWorkStatus] = await db
			.insert(workStatus)
			.values({
				name: data_validated.data.name,
				description: data_validated.data.description ?? null,
			})
			.returning();

		return json({ success: true, data: newWorkStatus }, { status: 201 });
	} catch (err) {
		console.error('Error al crear los estatus de trabajo:', err);
		throw error(500, 'Error al crear los estatus de trabajo');
	}
}
