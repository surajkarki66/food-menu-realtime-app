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

  // Placing the order, gets called from /src/Components/PlaceOrder.js of Frontend
  socket.on("putOrder", (order) => {
    foodItems
      .update({ _id: order._id }, { $inc: { ordQty: order.order } })
      .then((updatedDoc) => {
        // Emitting event to update the Kitchen opened across the devices with the realtime order values
        io.sockets.emit("changeData");
      });
  });

  // Order completion, gets called from /src/Components/Kitchen.js
  socket.on("markDone", (id) => {
    foodItems
      .update({ _id: id }, { $inc: { ordQty: -1, prodQty: 1 } })
      .then((updatedDoc) => {
        //Updating the different Kitchen area with the current Status.
        io.sockets.emit("change_data");
      });
  });
});

const port = config.PORT || 5003;

server.listen(port, () => console.log(`Listening on port ${port}`));
