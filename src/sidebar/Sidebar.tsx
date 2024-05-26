import { Link } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar: React.FC = () => {
  return (
    <div>
      <div className="sidebar-container">
        <Link to={"/"} className="sidebar-links">
          <div>
            <p className="sidebar-text">Dashboard</p>
          </div>
        </Link>

        <Link to={"/products"} className="sidebar-links">
          <div>
            <p className="sidebar-text">Products</p>
          </div>
        </Link>

        <Link to={"/orders"} className="sidebar-links">
          <div>
            <p className="sidebar-text">Orders</p>
          </div>
        </Link>

        <Link to={"/users"} className="sidebar-links">
          <div>
            <p className="sidebar-text">Users</p>
          </div>
        </Link>

        <hr />

        <Link to={"/addproduct"} className="sidebar-links">
          <div>
            <p className="sidebar-text">Add Product</p>
          </div>
        </Link>

        <Link to={"/adduser"} className="sidebar-links">
          <div>
            <p className="sidebar-text">Add User</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
