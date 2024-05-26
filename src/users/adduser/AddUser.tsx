import { useState } from "react";
import "./AddUser.scss";
import { User as UserInterface } from "../../types/User";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import backIcon from "../../assets/arrow-left-solid.svg";

const AddUser: React.FC = () => {
  const emptyUser: UserInterface = {
    userId: "",
    userName: "",
    email: "",
    phoneNo: "",
    addressList: [],
  };
  const [user, setUser] = useState<UserInterface>(emptyUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };

  const phoneNoPattern = /^[6-9]\d{9}$/;

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      user.userName.trim() === "" ||
      user.email.trim() === "" ||
      !phoneNoPattern.test(user.phoneNo)
    ) {
      setError("*All fields are required & must be valid");
      return;
    }
    setIsLoading(true);
    try {
      const newUser: UserInterface = user;
      const response = await axios.post("http://localhost:8080/users", newUser);
      setUser(emptyUser);
      history.push("/users");
      console.log(response.data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Link to={"/users"}>
          <div>
            <img src={backIcon} className="btn btn-primary back-icon mb-3" />
          </div>
        </Link>
      </div>
      <div className="add-container">
        <div>
          <p className="heading centered">Add User</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-layout mb-2">
            <label>Name: </label>
            <input
              type="text"
              name="userName"
              placeholder="enter user name"
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="input-layout mb-2">
            <label>Email: </label>
            <input
              type="text"
              name="email"
              placeholder="enter email"
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="input-layout mb-2">
            <label>PhoneNo: </label>
            <input
              type="text"
              name="phoneNo"
              placeholder="enter phoneNo"
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="centered">
            <button className="btn btn-success">
              {isLoading ? "Adding" : "Add User"}
            </button>
          </div>
          <p className="centered error-text mt-2">{error}</p>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
