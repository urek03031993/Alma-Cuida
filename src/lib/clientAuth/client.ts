import { createAuthClient } from "better-auth/svelte";


export const authClient = createAuthClient({
    baseURL: "https://alma-cuida.vercel.app/",
});