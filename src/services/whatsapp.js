import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;
import qrcode from "qrcode-terminal";

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    handleSIGINT: false,
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ WhatsApp de la Academia Online Conectado");
});

client.on("message", async (msg) => {
  if (msg.body === "!id") {
    try {
      const chat = await msg.getChat();
      console.log("--- ID DETECTADO ---");
      console.log(chat.id._serialized);
      await client.sendMessage(msg.from, `ID: ${chat.id._serialized}`, {
        sendSeen: false,
      });
    } catch (e) {
      console.error("Error enviando ID:", e);
    }
  }
});

export default client;
