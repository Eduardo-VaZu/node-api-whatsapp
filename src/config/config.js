import dotenv from "dotenv";
dotenv.config();

export default {
  GROUP_ID: process.env.GROUP_ID,
  DB_PATH: process.env.DB_PATH || "./alumnos.json",
  TIMEZONE: process.env.TIMEZONE || "America/Lima",
  CRON_SCHEDULE: process.env.CRON_SCHEDULE || "* 21 * * *", // Cada día a las 21:00
};
