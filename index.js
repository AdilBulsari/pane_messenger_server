const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { PORT = 9090 } = process.env;

const { Server } = require("socket.io");
const io = new Server(server);
app.get(
  "/",
  io.on("connection", (socket) => {
    socket.on("chat message", ({ user, msg }) => {
      io.emit("chat message", { user, msg });
    });
  })
);

server.listen(PORT, () => {
  console.log("listening on *: " + PORT);
});
