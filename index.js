const express = require("express");
const cors = require("cors");
const http = require("http");

const ENV = process.env.NODE_ENV || "development";
const { PORT = 9090 } = process.env;

const app = express();
const server = http.createServer(app);

app.use(cors);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ENV === "production" ? "PROD URL HERE" : "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("chat message", ({ user, msg }) => {
    io.emit("chat message", { user, msg });
  });
});

server.listen(PORT, () => {
  console.log("listening on:" + PORT);
});
