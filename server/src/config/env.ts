import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  ENVIRONMENT: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  ACCESS_TOKEN_SECRET: z.string().min(32),
  REFRESH_TOKEN_SECRET: z.string().min(32),
  ACCESS_TOKEN_EXPIRES_IN: z.string().default("15m"),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default("30d"),
  CLIENT_ORIGIN: z.string().min(1),
  ACCESS_TOKEN_COOKIE_NAME: z.string().default("access_token"),
  REFRESH_TOKEN_COOKIE_NAME: z.string().default("refresh_token"),
  PASSWORD_RESET_TOKEN_EXPIRES_IN: z.string().default("1h"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment configuration");
}

export const env = parsed.data;

const isProduction = env.ENVIRONMENT === "production";

export const cookieSecure: boolean = isProduction;

export const cookieSameSite: "lax" | "strict" | "none" = isProduction
  ? "none"
  : "lax";

const originSchema = z.string().url();

export const clientOrigins = env.CLIENT_ORIGIN.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)
  .map((origin) => originSchema.parse(origin));
