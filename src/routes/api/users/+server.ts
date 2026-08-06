import { db } from '$lib/server/db';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { user } from '$lib/server/db/auth.schema';
// import { serviceSchema } from '$lib/zod/schemas';
// import z from 'zod';


export const GET: RequestHandler = async () => {
	try {
		const services = await db
			.select({
				id: user.id,
				name: user.name,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,				
			})
			.from(user)
			.orderBy(user.id);

		return json({ success: true, data: services });
	} catch (err) {
		console.error('Error al obtener los usuarios:', err);
		throw error(500, 'Error al obtener los usuarios');
	}
};


// export const POST: RequestHandler = async ({ request }) => {
// 	try {
// 		const body = await request.json();		
// 		const data_validated = serviceSchema.safeParse(body);

// 		if (!data_validated.success) {
// 			return json(
// 				{ success: false, errors: z.flattenError(data_validated.error).fieldErrors },
// 				{ status: 400 }
// 			);
// 		}

// 		// Validar que la imagen exista si se proporciona
// 		// if (data_validated.data.imageUuid) {
// 		// 	const imgExists = await db
// 		// 		.select({ id: image.id })
// 		// 		.from(image)
// 		// 		.where(eq(image.id, data_validated.data.imageUuid))
// 		// 		.limit(1);

// 		// 	if (imgExists.length === 0) {
// 		// 		return json(
// 		// 			{ success: false, errors: { imageUuid: ['La imagen no existe'] } },
// 		// 			{ status: 400 }
// 		// 		);
// 		// 	}
// 		// }

// 		const [newService] = await db
// 			.insert(service)
// 			.values({
// 				name: data_validated.data.name,
// 				description: data_validated.data.description ?? null,
// 				active: data_validated.data.active,
// 				// imageUuid: data_validated.data.imageUuid ?? null
// 			})
// 			.returning();

// 		return json({ success: true, data: newService }, { status: 201 });
// 	} catch (err) {
// 		console.error('Error al crear servicio:', err);
// 		throw error(500, 'Error al crear el servicio');
// 	}
// }
