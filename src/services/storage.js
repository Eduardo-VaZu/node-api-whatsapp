import fs from "node:fs";
import { DB_PATH } from "../config/config.js";

export const leerAlumnos = () => {
  if (!fs.existsSync(DB_PATH)) return [];
  try {
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error leyendo base de datos:", error);
    return [];
  }
};
