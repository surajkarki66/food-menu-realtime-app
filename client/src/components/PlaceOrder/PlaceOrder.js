import React from "react";
import { Table, Container } from "reactstrap";
import { useSocket } from "../../contexts/SocketProvider";

const PlaceOrder = () => {
  const socket = useSocket();
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
        <tbody></tbody>
      </Table>
    </Container>
  );
};

export default PlaceOrder;
