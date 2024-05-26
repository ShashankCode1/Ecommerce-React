import { useState } from "react";
import { Product } from "../../types/Product";
import axios from "axios";
import "./AddProduct.scss";
import { Link, useHistory } from "react-router-dom";
import backIcon from "../../assets/arrow-left-solid.svg";

const AddProduct: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const emptyProduct: Product = {
    prodId: "",
    prodName: "",
    category: "",
    description: "",
    price: 0.0,
    imageURL: "",
  };

  const [product, setProduct] = useState<Product>(emptyProduct);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setError("");
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: +e.target.value });
    setError("");
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0] || null);
    setError("");
  };

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      product.prodName.trim() === "" ||
      product.category.trim() === "" ||
      product.description.trim() === "" ||
      product.price <= 0 ||
      isNaN(product.price) ||
      !imageFile
    ) {
      setError("*All fields are required & must be valid");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("prodName", product.prodName);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("price", product.price.toString());
      if (imageFile) {
        formData.append("image", imageFile);
      }
      const response = await axios.post(
        "http://localhost:8080/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProduct(emptyProduct);
      history.push("/products");
      console.log(response.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Link to={"/products"}>
          <div>
            <img src={backIcon} className="btn btn-primary back-icon mb-3" />
          </div>
        </Link>
      </div>
      <div className="add-container">
        <p className="heading centered">Add Product</p>
        <form onSubmit={handleSubmit}>
          <div className="input-layout mb-2">
            <label>Name:</label>
            <input
              type="text"
              name="prodName"
              placeholder="enter product name"
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-layout mb-2">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              placeholder="enter category"
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-layout mb-2">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              placeholder="enter description"
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-layout mb-2">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              placeholder="enter price"
              onChange={handlePrice}
              className="input-field"
            />
          </div>
          <div className="input-layout mb-2">
            <label>Image:</label>
            <input type="file" name="imageURL" onChange={handleImage} />
          </div>
          <div className="centered">
            <button className="btn btn-success">
              {isLoading ? "Adding" : "Add Product"}
            </button>
          </div>
          <p className="centered error-text mt-2">{error}</p>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
