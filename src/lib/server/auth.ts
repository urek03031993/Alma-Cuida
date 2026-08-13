import { env } from '$env/dynamic/private';
import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { admin } from "better-auth/plugins";
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'pg' }),
	emailAndPassword: { enabled: true },
	plugins: [
		admin({
			adminUserIds: [
				"03hV6XnCH2KC02H7AK1Z13oPi6wj6vw8",
				"fQndelYTsK6owu2TYFwAFMvStMdekaEI"
			],
		}),
		sveltekitCookies(getRequestEvent) 
	]
});

