import { WebSocketServer } from "ws";
import dotenv from "dotenv";
dotenv.config();
const port = Number(process.env.port) || 3000;
const wss = new WebSocketServer({ port: port });
wss.on("connection", (ws) => {
    console.log("Conection");
    ws.on("message", (data) => {
        const msg = JSON.parse(data.toString());
        console.log(msg);
        wss.clients.forEach((client) => {
            if (client.OPEN) {
                client.send(data.toString());
            }
        });
    });
    ws.on("error", erro => console.error);
});
