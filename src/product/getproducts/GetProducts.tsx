import { useEffect, useState } from "react";
import { Product as ProductInterface } from "../../types/Product";
import axios from "axios";
import Product from "./Product";
import "./GetProducts.scss";
import { Link } from "react-router-dom";

const GetProducts: React.FC<{
  showDetails: (product: ProductInterface) => void;
  addToCart: (product: ProductInterface) => void;
}> = ({ showDetails, addToCart }) => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/products");
        setProducts(response.data as ProductInterface[]);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error Occurred: {error}</p>;
  }

  return (
    <div>
      <div>
        {products.length === 0 ? (
          <div>
            <p className="conditional-msg">No products available</p>
            <p className="conditional-msg">
              *Add Product from{" "}
              <Link to={"/addproduct"}>
                <span className="btn btn-primary">here</span>
              </Link>
            </p>
          </div>
        ) : (
          <div>
            <div className="navigation-btns">
              <Link to={"/addproduct"}>
                <div className="cart-btn mb-4">
                  <button className="btn btn-danger">Add Product</button>
                </div>
              </Link>
              <Link to={"/cart"}>
                <div className="cart-btn mb-4">
                  <button className="btn btn-primary">Go to Cart</button>
                </div>
              </Link>
            </div>

            <div className="products-layout">
              {products.map((eachProduct) => (
                <Product
                  key={eachProduct.prodId}
                  product={eachProduct}
                  showDetails={showDetails}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetProducts;
