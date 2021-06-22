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

  // Placing the order, gets called from /src/Components/PlaceOrder/PlaceOrder.js of Frontend
  socket.on("putOrder", (order) => {
    foodItems
      .update({ _id: order._id }, { $inc: { ordQty: order.order } })
      .then((updatedDoc) => {
        // Emitting event to update the Kitchen opened across the devices with the realtime order values
        io.sockets.emit("changeData");
      });
  });

  // Order completion, gets called from /src/Components/Kitchen/Kitchen.js
  socket.on("markDone", (id) => {
    foodItems
      .update({ _id: id }, { $inc: { ordQty: -1, prodQty: 1 } })
      .then((updatedDoc) => {
        //Updating the different Kitchen area with the current Status.
        io.sockets.emit("changeData");
      });
  });

  // Functionality to change the predicted quantity value, called from /src/Components/UpdatePredicted.js
  socket.on("ChangePred", (predicted_data) => {
    foodItems
      .update(
        { _id: predicted_data._id },
        { $set: { predQty: predicted_data.predQty } }
      )
      .then((updatedDoc) => {
        // Socket event to update the Predicted quantity across the Kitchen
        io.sockets.emit("changeData");
      });
  });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = config.PORT || 5003;

server.listen(port, () => console.log(`Listening on port ${port}`));
