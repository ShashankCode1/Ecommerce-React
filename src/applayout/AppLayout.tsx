import { Route, Switch } from "react-router-dom";
import Header from "../header/Header";
import Dashboard from "../dashboard/Dashboard";
import Sidebar from "../sidebar/Sidebar";
import GetProducts from "../product/getproducts/GetProducts";
import AddProduct from "../product/addproduct/AddProduct";
import "./AppLayout.scss";
import { Product as ProductInterface } from "../types/Product";
import { useState } from "react";
import ProductDetails from "../product/getproducts/ProductDetails";
import GetUsers from "../users/getusers/GetUsers";
import { User as UserInterface } from "../types/User";
import AddUser from "../users/adduser/AddUser";
import UserDetails from "../users/getusers/Userdetails";
import Cart from "../cart/Cart";
import { Cart as CartInterface } from "../types/Cart";
import GetOrders from "../orders/GetOrders";
import { Order as OrderInterface, ShippingInfo } from "../types/Order";
import OrderDetails from "../orders/OrderDetails";

const AppLayout: React.FC = () => {
  const emptyProduct: ProductInterface = {
    prodId: "",
    prodName: "",
    category: "",
    description: "",
    price: 0.0,
    imageURL: "",
  };

  const [productDetails, setProductDetails] =
    useState<ProductInterface>(emptyProduct);

  const showDetails = (product: ProductInterface) => {
    setProductDetails(product);
  };

  const emptyUser: UserInterface = {
    userId: "",
    userName: "",
    email: "",
    phoneNo: "",
    addressList: [],
  };
  const [user, setUser] = useState<UserInterface>(emptyUser);

  const displayUser = (user: UserInterface) => {
    setUser(user);
  };

  const [cartItems, setCartItems] = useState<CartInterface[]>([]);

  const addToCart = (product: ProductInterface) => {
    const findProduct = cartItems.findIndex(
      (eachCartItem) => eachCartItem.product.prodId === product.prodId
    );
    if (findProduct === -1) {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (cartItem: ProductInterface) => {
    const updatedCartItems = cartItems.filter(
      (eachCartItem) => eachCartItem.product.prodId !== cartItem.prodId
    );
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (cartItem: CartInterface) => {
    const updatedCartItems = cartItems.map((eachCartItem) => {
      if (eachCartItem.product.prodId === cartItem.product.prodId) {
        const newQuantity = cartItem.quantity > 1 ? cartItem.quantity - 1 : 1;
        return { ...cartItem, quantity: newQuantity };
      }
      return eachCartItem;
    });
    setCartItems(updatedCartItems);
  };

  const increaseQuantity = (cartItem: CartInterface) => {
    const updatedCartItems = cartItems.map((eachCartItem) =>
      eachCartItem.product.prodId === cartItem.product.prodId
        ? { ...cartItem, quantity: eachCartItem.quantity + 1 }
        : eachCartItem
    );
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

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
  const [selectedOrder, setSelectedOrder] =
    useState<OrderInterface>(emptyOrder);

  const displayOrderDetails = (order: OrderInterface) => {
    setSelectedOrder(order);
  };

  return (
    <div className="app-layout">
      <div>
        <Header />
      </div>

      <div className="sidebar-main-container">
        <div>
          <Sidebar />
        </div>

        <div className="main-content">
          <Switch>
            <Route path={"/"} exact>
              <Dashboard />
            </Route>
            <Route path={"/products"}>
              <GetProducts showDetails={showDetails} addToCart={addToCart} />
            </Route>
            <Route path={"/addproduct"}>
              <AddProduct />
            </Route>
            <Route path={"/productdetails"}>
              <ProductDetails {...productDetails} />
            </Route>
            <Route path={"/users"}>
              <GetUsers displayUser={displayUser} />
            </Route>
            <Route path={"/adduser"}>
              <AddUser />
            </Route>
            <Route path={"/userdetails"}>
              <UserDetails user={user} />
            </Route>
            <Route path={"/cart"}>
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                clearCart={clearCart}
              />
            </Route>
            <Route path={"/orders"}>
              <GetOrders displayOrderDetails={displayOrderDetails} />
            </Route>
            <Route path={"/orderdetails"}>
              <OrderDetails selectedOrder={selectedOrder} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
