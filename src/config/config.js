import dotenv from "dotenv";
dotenv.config();

export const GROUP_ID = process.env.GROUP_ID;
export const DB_PATH = process.env.DB_PATH || "./alumnos.json";
export const TIMEZONE = process.env.TIMEZONE || "America/Lima";
export const CRON_SCHEDULE = process.env.CRON_SCHEDULE || "* 21 * * *";
