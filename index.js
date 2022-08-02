const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { PORT = 9090 } = process.env;
const cors = require("cors");

app.use(cors);

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Connected");
  socket.on("chat message", ({ user, msg }) => {
    console.log("message recieved");
    io.emit("chat message", { user, msg });
  });
});

server.listen(PORT, () => {
  console.log("listening on *:" + PORT);
});
