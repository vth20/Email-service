import { loadSync } from "deps";

const env: string = Deno.env.get("ENV") || "development";
const envPath: string = `server/environments/.env.${env}`;

loadSync({
  envPath,
  export: true,
});

/**
 * Configuration
 */
const config: {
  env: string;
  appName: string;
  ip: string;
  host: string;
  port: number;
  protocol: string;
  dbHost: string;
  dbPort: string;
  dbName: string;
  clientUrl: string;
  url: string;
  mongoUrl: string;
  rabbitMQUrl: string;
  smtpMail: string;
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
} = {
  env,
  appName: Deno.env.get("APP_NAME") as unknown as string,
  ip: Deno.env.get("IP") as unknown as string,
  host: Deno.env.get("HOST") as unknown as string,
  port: Deno.env.get("PORT") as unknown as number,
  protocol: Deno.env.get("PROTOCOL") as unknown as string,
  dbHost: Deno.env.get("DB_HOST") as unknown as string,
  dbPort: Deno.env.get("DB_PORT") as unknown as string,
  dbName: Deno.env.get("DB_NAME") as unknown as string,
  clientUrl: Deno.env.get("CLIENT_URL") as unknown as string,
  url: `${Deno.env.get("PROTOCOL") as unknown as string}://${
    Deno.env.get("HOST") as unknown as string
  }:${Deno.env.get("PORT") as unknown as number}`,
  mongoUrl: Deno.env.get("MONGO_URI") as unknown as string,
  rabbitMQUrl: Deno.env.get("RABBITMQ_URI") as unknown as string,
  smtpMail: Deno.env.get("SMPT_MAIL") as unknown as string,
  smtpHost: Deno.env.get("SMTP_HOST") as unknown as string,
  smtpPort: Number(Deno.env.get("SMTP_PORT") as unknown as number),
  smtpUsername: Deno.env.get("SMTP_USERNAME") as unknown as string,
  smtpPassword: Deno.env.get("SMTP_PASSWORD") as unknown as string,
};
console.log(config);
export default config;
