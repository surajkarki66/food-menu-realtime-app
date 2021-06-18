import React, { useState, useEffect } from "react";
import { Table, Container } from "reactstrap";
import { useSocket } from "../../contexts/SocketProvider";

const PlaceOrder = () => {
  const socket = useSocket();
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    if (socket == null) return;
    // Loading initial menu
    socket.emit("initialData");
    socket.on("getData", getData);
    return () => {
      // clean up code
      socket.off("getData", getData);
    };
  }, [socket]);
  const getData = (foodItems) => {
    foodItems = foodItems.map((food) => {
      food.order = 0;
      return food;
    });
    setFoodData(foodItems);
  };
  const changeQuantity = (event, foodId) => {
    if (parseInt(event.target.value) < 0) {
      event.target.value = 0;
    }
    const newArray = foodData.map((food) => {
      if (food._id === foodId) {
        food.order = parseInt(event.target.value);
      }
      return food;
    });
    setFoodData(newArray);
  };

  const getFoodData = () => {
    return foodData.map((food) => {
      return (
        <tr key={food._id}>
          <td> {food.name} </td>
          <td>
            <input
              onChange={(e) => changeQuantity(e, food._id)}
              value={food.order}
              type="number"
              placeholder="Quantity"
            />
          </td>
          <td>
            <button>Order</button>
          </td>
        </tr>
      );
    });
  };
  return (
    <Container>
      <h2 className="h2Class">Order Menu</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>{getFoodData()}</tbody>
      </Table>
    </Container>
  );
};

export default PlaceOrder;
