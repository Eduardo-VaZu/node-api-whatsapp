import client from "./services/whatsapp.js";
import { iniciarTareas } from "./services/scheduler.js";

// Iniciar tareas cuando el cliente esté listo
client.on("ready", () => {
  iniciarTareas(client);
});

client.initialize();
