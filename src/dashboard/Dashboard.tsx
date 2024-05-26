import { useEffect, useState } from "react";
import "./Dashboard.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productCount, setProductCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [usersCount, setUsersCount] = useState<number>(0);

  useEffect(() => {
    const fetchProductCount = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/products/count"
        );
        setProductCount(response.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductCount();
  }, []);

  useEffect(() => {
    const fetchUsersCount = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/users/count");
        setUsersCount(response.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsersCount();
  }, []);

  const [ordersCount, setOrdersCount] = useState<number>(0);

  useEffect(() => {
    const fetchOrdersCount = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/orders/count");
        setOrdersCount(response.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrdersCount();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error Occurred: {error}</p>;
  }
  return (
    <div>
      <Link to={"/cart"}>
        <div className="cart-btn">
          <button className="btn btn-primary">Go to Cart</button>
        </div>
      </Link>
      <div className="box-containers">
        <div className="box">
          <p className="box-title">Products</p>
          <p className="box-count">{productCount}</p>
        </div>

        <div className="box">
          <p className="box-title">Orders</p>
          <p className="box-count">{ordersCount}</p>
        </div>

        <div className="box">
          <p className="box-title">Users</p>
          <p className="box-count">{usersCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
