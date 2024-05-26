import { useLocation } from "react-router-dom";
import "./Header.scss";

const Header: React.FC = () => {
  const location = useLocation();
  return (
    <div>
      <div className="header-container">
        <div>
          {location.pathname === "/" && (
            <p className="header-text">Dashboard</p>
          )}
        </div>

        <div>
          {location.pathname === "/products" && (
            <p className="header-text">Products</p>
          )}
        </div>

        <div>
          {location.pathname === "/addproduct" && (
            <p className="header-text">Add Product</p>
          )}
        </div>

        <div>
          {location.pathname === "/productdetails" && (
            <p className="header-text">Product Details</p>
          )}
        </div>

        <div>
          {location.pathname === "/users" && (
            <p className="header-text">Users</p>
          )}
        </div>

        <div>
          {location.pathname === "/adduser" && (
            <p className="header-text">Add User</p>
          )}
        </div>

        <div>
          {location.pathname === "/userdetails" && (
            <p className="header-text">User Details</p>
          )}
        </div>

        <div>
          {location.pathname === "/cart" && <p className="header-text">Cart</p>}
        </div>

        <div>
          {location.pathname === "/orders" && (
            <p className="header-text">Orders</p>
          )}
        </div>

        <div>
          {location.pathname === "/orderdetails" && (
            <p className="header-text">Order Details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
