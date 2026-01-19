const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  GROUP_ID: process.env.GROUP_ID,
  DB_PATH: process.env.DB_PATH || "./alumnos.json",
  TIMEZONE: process.env.TIMEZONE || "America/Lima",
  CRON_SCHEDULE: process.env.CRON_SCHEDULE || "30 8 * * *",
};
