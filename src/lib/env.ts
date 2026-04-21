import { z } from "zod";

const envSchema = z.object({
	GTM_ID: z
		.string()
		.min(1, "GTM_ID deve ser definido")
		.regex(/^GTM-[A-Z0-9]+$/, "GTM_ID deve estar no formato GTM-XXXXX"),
});

type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse({
	GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
});
