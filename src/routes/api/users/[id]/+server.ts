import { db } from '$lib/server/db';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { user } from '$lib/server/db/schema';
import { userUpdateSchema } from '$lib/zod/schemas';
import { eq } from 'drizzle-orm';
import z from 'zod';


export const PUT: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const parsed = userUpdateSchema.safeParse(body);

		if (!parsed.success) {
			return json(
				{ success: false, errors: z.flattenError(parsed.error).fieldErrors },
				{ status: 400 }
			);
		}

		const existing = await db
			.select()
			.from(user)
			.where(eq(user.id, parsed.data.id))
			.limit(1);

		if (existing.length === 0) {
			return json(
				{ success: false, errors: { general: ['Usuario no encontrado'] } },
				{ status: 404 }
			);
		}

		const [updated] = await db
			.update(user)
			.set({
				...parsed.data,
				updatedAt: new Date()
			})
			.where(eq(user.id, parsed.data.id))
			.returning();

		return json({ success: true, data: updated });
	} catch (err) {
		console.error('Error al actualizar usuario:', err);
		throw error(500, 'Error al actualizar el usuario');
	}
}


// export const DELETE: RequestHandler = async ({ params }) => {
// 	try {		
// 		const id = params.id

// 		if (!id) {
// 			return json(
// 				{ success: false, errors: { id: ['ID inválido'] } },
// 				{ status: 400 }
// 			);
// 		}

// 		const existing = await db
// 			.select()
// 			.from(user)
// 			.where(eq(user.id, id))
// 			.limit(1);

// 		if (existing.length === 0) {
// 			return json(
// 				{ success: false, errors: { general: ['Usuario no encontrado'] } },
// 				{ status: 404 }
// 			);
// 		}

// 		await db.delete(user).where(eq(user.id, id));

// 		return json({ success: true, message: 'Usuario eliminado correctamente' });
// 	} catch (err) {
// 		console.error('Error al eliminar usuario:', err);
// 		throw error(500, 'Error al eliminar el usuario');
// 	}
// }