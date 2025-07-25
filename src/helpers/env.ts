import { config } from "dotenv";

export type role = "producer" | "consumer" | "both" | "none";

process.env.node_env !== "production" ? config() : "";
export const apiVersion: string = process.env.API_VERSION || "v1";
export const corsOrigin: string = process.env.CORS_ORIGIN || `http://${process.env.APP_HOST || "localhost"}:${process.env.APP_PORT || 3000}`;
export const database_url: string =
    `${process.env.DATABASE_URL}` ||
    "mysql://root@localhost:3306/data";
export const host: string = process.env.APP_HOST || "localhost";
export const jwtPublic = process.env.JWT_PUBLIC || "secret";
export const jwtSecret: string = process.env.JWT_SECRET || "secret";
export const kafkaBroker: string = process.env.KAFKA_BROKER || "";
export const kafkaClientId: string = process.env.KAFKA_CLIENT_ID || "";
export const kafkaGroupId: string = process.env.KAFKA_GROUP_ID || "";
export const language: string = process.env.LANGUAGE || "en-US";
export const murder: () => void = () => process.exit(0);
export const port: number = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;
export const topics: string[] = process.env.KAFKA_TOPICS ? process.env.KAFKA_TOPICS.split(",") : [];
export const role: role = process.env.KAFKA_ROLE as role || "none";
export const domains = process.env.AD_DOMAINS ? process.env.AD_DOMAINS.split(",") : ["gs2e.ci"];