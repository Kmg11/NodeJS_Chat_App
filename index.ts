import express from "express";
import { Server } from "socket.io";
import path from "path";
import { ClientToServerEvents, ServerToClientEvents } from "./types";
import { handleSocketConnection } from "./socketHandler";

const PORT = process.env.PORT || 3500;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

const appServer = app.listen(PORT, () => {
	console.log("Server listening on port 3500");
});

const io = new Server<ClientToServerEvents, ServerToClientEvents>(appServer, {
	cors: { origin: false },
});

handleSocketConnection(io);
