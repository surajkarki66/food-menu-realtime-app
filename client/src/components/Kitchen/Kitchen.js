import React, { useState, useEffect, useCallback } from "react";
import { Button, Table, Container } from "reactstrap";

import { useSocket } from "../../contexts/SocketProvider";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Kitchen = () => {
  const socket = useSocket();
  const [foodData, setFoodData] = useState([]);

  const getData = (foodItems) => {
    setFoodData(foodItems);
  };

  const changeData = useCallback(() => {
    socket.emit("initialData");
  }, [socket]);

  useEffect(() => {
    socket.emit("initialData");
    socket.on("getData", getData);
    socket.on("changeData", changeData);
    return () => {
      socket.off("getData");
      socket.off("changeData");
    };
  }, [changeData, socket]);

  const markDone = (id) => {
    socket.emit("markDone", id);
  };

  const getFoodData = () => {
    return foodData.map((food) => {
      return (
        <tr key={food._id}>
          <td> {food.name} </td>
          <td> {food.ordQty} </td>
          <td> {food.prodQty} </td>
          <td> {food.predQty} </td>
          <td>
            <Button onClick={() => markDone(food._id)}>Done</Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <Container>
      <h2 className="h2Class">Kitchen Area</h2>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Download as XLS"
      />

      <Table striped id="table-to-xls">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Created Till Now</th>
            <th>Predicted</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{getFoodData()}</tbody>
      </Table>
    </Container>
  );
};

export default Kitchen;
