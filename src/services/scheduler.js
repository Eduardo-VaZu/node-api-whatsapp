import cron from "node-cron";
import { leerAlumnos } from "./storage.js";
import { GROUP_ID, TIMEZONE, CRON_SCHEDULE } from "../config/config.js";

async function enviarMensajes(client) {
  const ahora = new Date();
  const hoyFull = ahora.toLocaleDateString("en-CA", { timeZone: TIMEZONE });
  const hoyMMDD = hoyFull.slice(5, 10);

  console.log(`Revisando fecha: ${hoyFull}`);
  const alumnos = leerAlumnos();

  for (const alumno of alumnos) {
    // --- PROCESO DE PAGO ---
    if (alumno.vencimiento === hoyFull) {
      try {
        const chatId = `${alumno.telefono}@c.us`;
        const mensaje = `Hola ${alumno.nombre}, hoy vence tu mensualidad 🏐\nPago: ${alumno.pago}\nVencimiento: ${alumno.vencimiento}`;

        await client.sendMessage(chatId, mensaje, { sendSeen: false });
        console.log(`✅ Pago enviado a ${alumno.nombre}`);
      } catch (e) {
        console.error(`⚠️ Error enviando pago a ${alumno.nombre}:`, e);
      }
    }

    // --- PROCESO DE CUMPLE ---
    if (alumno.cumple === hoyMMDD) {
      try {
        const mensaje = `¡Hoy es cumple de ${alumno.nombre}! 🎉🏐 A meterle huevo hoy en la cancha.`;
        await client.sendMessage(GROUP_ID, mensaje, { sendSeen: false });
        console.log(`✅ Cumple de ${alumno.nombre} enviado al grupo`);
      } catch (e) {
        console.error(`⚠️ Error enviando cumple al grupo:`, e);
      }
    }
  }
}

export function iniciarTareas(client) {
  // 1. Ejecución inmediata al iniciar
  enviarMensajes(client);

  // 2. Programación
  cron.schedule(
    CRON_SCHEDULE,
    () => {
      console.log("⏰ Iniciando tarea programada...");
      enviarMensajes(client);
    },
    {
      scheduled: true,
      timezone: TIMEZONE,
    },
  );
}
