import { Product as ProductInterface } from "../../types/Product";
import "./ProductDetails.scss";
import backIcon from "../../assets/arrow-left-solid.svg";
import { Link } from "react-router-dom";

const ProductDetails: React.FC<ProductInterface> = (product) => {
  const imageURL = `http://localhost:8080/images/${product.imageURL}`;
  return (
    <div>
      {product.prodId === "" ? (
        <p className="conditional-msg">*Select a product to display details</p>
      ) : (
        <div>
          <Link to={"/products"}>
            <div>
              <img src={backIcon} className="btn btn-primary back-icon mb-3" />
            </div>
          </Link>
          <div className="details-container">
            <div>
              <img src={imageURL} alt="prod-img" className="prod-detail-img" />
            </div>

            <div>
              <p className="prod-detail-name">{product.prodName}</p>
              <p className="prod-details">Category: {product.category}</p>
              <p className="prod-details">{product.description}</p>
              <p className="prod-details">₹ {product.price}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
