const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const foodItems = require("./db");
const config = require("./config");
const app = express();

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New client connected " + socket.id);

  // Returning the initial data of food menu from FoodItems collection
  socket.on("initialData", () => {
    foodItems.find({}).then((docs) => {
      io.sockets.emit("getData", docs);
    });
  });

  // Placing the order, gets called from /src/main/PlaceOrder.js of Frontend
  socket.on("putOrder", (order) => {
    foodItems
      .update({ _id: order._id }, { $inc: { ordQty: order.order } })
      .then((updatedDoc) => {
        // Emitting event to update the Kitchen opened across the devices with the realtime order values
        io.sockets.emit("changeData");
      });
  });
});

const port = config.PORT || 5003;

server.listen(port, () => console.log(`Listening on port ${port}`));
