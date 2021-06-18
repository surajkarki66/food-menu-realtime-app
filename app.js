const express = require("express");
const http = require("http");

const db = require("./db");
const config = require("./config");
const app = express();

const server = http.createServer(app);

const port = config.PORT || 5003;

server.listen(port, () => console.log(`Listening on port ${port}`));
