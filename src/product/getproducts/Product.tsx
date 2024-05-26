import { Link } from "react-router-dom";
import { Product as ProductInterface } from "../../types/Product";
import "./Product.scss";

interface ProductProps {
  product: ProductInterface;
  showDetails: (product: ProductInterface) => void;
  addToCart: (product: ProductInterface) => void;
}

const Product: React.FC<ProductProps> = ({
  product,
  showDetails,
  addToCart,
}) => {
  const imageURL = `http://localhost:8080/images/${product.imageURL}`;
  return (
    <div>
      <div className="product-container">
        <Link to={"/productdetails"}>
          <div onClick={() => showDetails(product)}>
            <img src={imageURL} alt="product-img" className="prod-img" />
          </div>
        </Link>
        <div className="mt-3">
          <p className="prod-name ">{product.prodName}</p>
          <p className="prod-desc">{product.description}</p>
          <button
            className="btn btn-success"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
