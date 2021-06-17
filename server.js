const express = require("express");
const http = require("http");

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Listening on port ${port}`));
