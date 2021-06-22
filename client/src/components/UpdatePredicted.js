import React, { useEffect, useState } from "react";
import { Button, Table, Container } from "reactstrap";

import { useSocket } from "../contexts/SocketProvider";

const UpdatePredicted = () => {
  const socket = useSocket();
  const [foodData, setFoodData] = useState([]);
  const getData = (foodItems) => {
    setFoodData(foodItems);
  };
  useEffect(() => {
    if (socket == null) return;
    socket.emit("initialData");
    socket.on("getData", getData);
    return () => {
      socket.off("getData", getData);
    };
  }, [socket]);

  const sendPredQty = (id) => {
    var predicted_details;
    foodData.map((food) => {
      if (food._id === id) {
        predicted_details = food;
      }
      return food;
    });
    socket.emit("ChangePred", predicted_details);
  };

  const changePredQuantity = (event, foodId) => {
    if (parseInt(event.target.value) < 0) {
      event.target.value = 0;
    }
    const new_array = foodData.map((food) => {
      if (food._id === foodId) {
        food.predQty = parseInt(event.target.value);
      }
      return food;
    });
    setFoodData(new_array);
  };

  const getFoodData = () => {
    return foodData.map((food) => {
      return (
        <tr key={food._id}>
          <td> {food.name} </td>
          <td>
            <input
              onChange={(e) => changePredQuantity(e, food._id)}
              value={food.predQty}
              type="number"
              placeholder="Quantity"
              min="0"
            />
          </td>
          <td>
            <Button onClick={() => sendPredQty(food._id)}>Update Qty</Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <Container>
      <h2 className="h2Class">Update Predicted</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Product</th>
            <th>Predicted Qty</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>{getFoodData()}</tbody>
      </Table>
    </Container>
  );
};

export default UpdatePredicted;
