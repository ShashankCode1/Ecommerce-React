import axios from "axios";
import { useEffect, useState } from "react";
import { Order as OrderInterface } from "../types/Order";
import { Table } from "react-bootstrap";
import "./GetOrders.scss";
import { Link } from "react-router-dom";

const GetOrders: React.FC<{
  displayOrderDetails: (order: OrderInterface) => void;
}> = ({ displayOrderDetails }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/orders");
        setOrders(response.data as OrderInterface[]);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error Occurred: {error}</p>;
  }

  return (
    <div>
      <Table hover striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Order Id</th>
            <th>Total Price</th>
            <th>Quantity</th>
            <th>City</th>
            <th>More</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((eachOrder) => (
            <tr key={eachOrder.orderId}>
              <td>{eachOrder.shippingInfo.userName}</td>
              <td>{eachOrder.orderId}</td>
              <td>₹ {eachOrder.totalCartPrice}</td>
              <td>{eachOrder.totalCartQuantity}</td>
              <td>{eachOrder.shippingInfo.shippingAddress.city}</td>
              <td onClick={() => displayOrderDetails(eachOrder)}>
                <Link to={"/orderdetails"} className="link-text">
                  ...
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GetOrders;
