import { Product as ProductInterface } from "../types/Product";
import "./Cart.scss";
import { Cart as CartInterface } from "../types/Cart";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Address as AddressInterface,
  User as UserInterface,
} from "../types/User";
import { Order as OrderInterface, ShippingInfo } from "../types/Order";
import { useHistory } from "react-router-dom";

interface CartProps {
  cartItems: CartInterface[];
  removeFromCart: (cartItem: ProductInterface) => void;
  decreaseQuantity: (cartItem: CartInterface) => void;
  increaseQuantity: (cartItem: CartInterface) => void;
  clearCart: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
}) => {
  const totalCartPrice = cartItems.reduce(
    (total, eachCartItem) =>
      total + eachCartItem.product.price * eachCartItem.quantity,
    0
  );

  const [userId, setUserId] = useState<string>("");

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
    setPlaceOrderBtn(false);
  };

  const [showAddresses, setShowAddresses] = useState<boolean>(false);

  const showAddressList = () => {
    if (userId.trim() === "") {
      setShowAddresses(false);
    } else {
      setShowAddresses(true);
    }
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const repsonse = await axios.get("http://localhost:8080/users");
        setUsers(repsonse.data as UserInterface[]);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const [addressList, setAddressList] = useState<AddressInterface[]>([]);
  useEffect(() => {
    if (userId) {
      const fetchAddressListByUserId = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:8080/users/addressList/${userId}`
          );
          setAddressList(response.data as AddressInterface[]);
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAddressListByUserId();
    }
  }, [userId]);

  const [addressId, setAddressId] = useState<string>("");

  const emptyShippingInfo: ShippingInfo = {
    userId: "",
    userName: "",
    email: "",
    phoneNo: "",
    shippingAddress: { addressId: "", doorNo: "", street: "", city: "" },
  };

  const emptyOrder: OrderInterface = {
    orderId: "",
    cartItems: [],
    totalCartQuantity: 0,
    totalCartPrice: 0,
    shippingInfo: emptyShippingInfo,
  };

  const orderId: string = "";

  const [order, setOrder] = useState<OrderInterface>(emptyOrder);

  const handleUserAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddressId(e.target.value);
  };

  const [placeOrderBtn, setPlaceOrderBtn] = useState<boolean>(false);

  const showPlaceOrderBtn = () => {
    if (addressId.trim() === "") {
      setPlaceOrderBtn(false);
    } else {
      setPlaceOrderBtn(true);
      const selectedUser = users.find((eachUser) => eachUser.userId === userId);
      const selectedAddress = addressList.find(
        (eachAddress) => eachAddress.addressId === addressId
      );
      if (selectedUser && selectedAddress) {
        setOrder({
          orderId,
          cartItems,
          totalCartQuantity,
          totalCartPrice,
          shippingInfo: {
            userId: selectedUser.userId,
            userName: selectedUser.userName,
            email: selectedUser.email,
            phoneNo: selectedUser.phoneNo,
            shippingAddress: selectedAddress,
          },
        });
      }
    }
  };

  const totalCartQuantity = cartItems.reduce(
    (total, eachCartItem) => total + eachCartItem.quantity,
    0
  );

  const history = useHistory();

  const handlePlaceOrder = async () => {
    if (totalCartPrice > 0) {
      setIsLoading(true);
      try {
        const newOrder: OrderInterface = order;
        const response = await axios.post(
          "http://localhost:8080/orders",
          newOrder
        );
        setOrder(emptyOrder);
        console.log(response.data);
        clearCart();
        setUserId("");
        setAddressId("");
        history.push("/orders");
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <p className="conditional-msg">*No items in cart</p>
      ) : (
        <div>
          <div className="cartItems-container">
            {cartItems.map((eachCartItem) => (
              <div className="cartItem-card" key={eachCartItem.product.prodId}>
                <div>
                  <p className="cartItem-name">
                    {eachCartItem.product.prodName}
                  </p>
                </div>

                <div className="quantity-card">
                  <button
                    className="quantity-btn"
                    onClick={() => decreaseQuantity(eachCartItem)}
                  >
                    -
                  </button>
                  <p>{eachCartItem.quantity}</p>
                  <button
                    className="quantity-btn"
                    onClick={() => increaseQuantity(eachCartItem)}
                  >
                    +
                  </button>
                </div>

                <div>
                  <p>₹ {eachCartItem.product.price * eachCartItem.quantity}</p>
                </div>

                <div className="mb-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(eachCartItem.product)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="mt-3">
              <p className="total-price">Total : ₹ {totalCartPrice}</p>
            </div>

            <div className="mt-3">
              <select
                onChange={handleUserChange}
                onClick={showAddressList}
                value={userId}
              >
                <option value="">Select User</option>
                {users.map((eachUser) => (
                  <option key={eachUser.userId} value={eachUser.userId}>
                    {eachUser.userName}
                  </option>
                ))}
              </select>
            </div>

            {showAddresses && (
              <div className="mt-3">
                <select
                  onChange={handleUserAddress}
                  onClick={showPlaceOrderBtn}
                  value={addressId}
                >
                  <option value="">Select Address</option>
                  {addressList.map((eachAddress) => (
                    <option
                      key={eachAddress.addressId}
                      value={eachAddress.addressId}
                    >
                      {eachAddress.doorNo}, {eachAddress.street},{" "}
                      {eachAddress.city}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {placeOrderBtn && (
              <div className="mt-3">
                <button className="btn btn-success" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
