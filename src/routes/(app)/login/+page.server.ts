import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";
import { resolve } from "$app/paths";


export const actions = {
  	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get("email")?.toString() ?? "";
		const password = formData.get("password")?.toString() ?? "";

		if (!email || !password) {
			return fail(400, { message: "Completa email y password" });
		}

		await auth.api.signInEmail({
			body: { 
				email, password 
			}
		});

		redirect(303, resolve('/(app)'));
  	}
};