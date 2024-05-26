import { Table } from "react-bootstrap";
import { Order as OrderInterface } from "../types/Order";
import "./OrderDetails.scss";
import { Link } from "react-router-dom";
import backIcon from "../assets/arrow-left-solid.svg";

const OrderDetails: React.FC<{ selectedOrder: OrderInterface }> = ({
  selectedOrder,
}) => {
  return (
    <div>
      {selectedOrder.cartItems.length === 0 ? (
        <p className="conditional-msg">
          *Select an order to display order details
        </p>
      ) : (
        <div>
          <div>
            <Link to={"/orders"}>
              <div>
                <img
                  src={backIcon}
                  className="btn btn-primary back-icon mb-3"
                />
              </div>
            </Link>
          </div>
          <div>
            <p className="order-user-name">
              {selectedOrder.shippingInfo.userName}
            </p>
            <p className="order-address">
              {selectedOrder.shippingInfo.shippingAddress.doorNo},{" "}
              {selectedOrder.shippingInfo.shippingAddress.street},{" "}
              {selectedOrder.shippingInfo.shippingAddress.city}
            </p>
          </div>

          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.cartItems.map((eachCartItem) => (
                  <tr key={eachCartItem.product.prodId}>
                    <td>{eachCartItem.product.prodName}</td>
                    <td>{eachCartItem.quantity}</td>
                    <td>₹ {eachCartItem.product.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="order-price">
            <p>Total Price: ₹ {selectedOrder.totalCartPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
