const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const db = require("./db");
const config = require("./config");
const app = express();

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New client connected" + socket.id);
});

const port = config.PORT || 5003;

server.listen(port, () => console.log(`Listening on port ${port}`));
