"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type === "chat") {
            // const currentUserRoom = allSockets.find((x) => x.socket == socket).room;
            let currentuserRoom = null;
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].socket == socket) {
                    currentuserRoom = allSockets[i].room;
                }
            }
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].room == currentuserRoom) {
                    allSockets[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
    });
});
