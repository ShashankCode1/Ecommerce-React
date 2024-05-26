import { useEffect, useState } from "react";
import {
  Address as AddressInterface,
  User as UserInterface,
} from "../../types/User";
import "./UserDetails.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import backIcon from "../../assets/arrow-left-solid.svg";

interface UserDetailsProps {
  user: UserInterface;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  const [displayAddresses, setdisplayAddresses] = useState<boolean>(true);
  const showAddressForm = () => {
    setdisplayAddresses(false);
  };

  const showAddresses = () => {
    setdisplayAddresses(true);
  };
  const [error, setError] = useState<string | null>(null);
  const emptyAddress: AddressInterface = {
    addressId: "",
    doorNo: "",
    street: "",
    city: "",
  };
  const [address, setAddress] = useState<AddressInterface>(emptyAddress);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    setError("");
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      address.doorNo.trim() === "" ||
      address.street.trim() === "" ||
      address.city.trim() === ""
    ) {
      setError("*All fields are required");
      return;
    }
    setIsLoading(true);
    try {
      const newAddress: AddressInterface = address;
      const response = await axios.post(
        `http://localhost:8080/address/${user.userId}`,
        newAddress
      );
      setAddress(emptyAddress);
      console.log(response.data);
      showAddresses();
      setRefreshData(refreshData + 1);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const [addresses, setAddresses] = useState<AddressInterface[]>([]);
  const [refreshData, setRefreshData] = useState<number>(0);

  useEffect(() => {
    const fetchUserAddresses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/users/addressList/${user.userId}`
        );
        setAddresses(response.data as AddressInterface[]);
        console.log(response.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserAddresses();
  }, [refreshData, user.userId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error Occurred: {error}</p>;
  }
  return (
    <div>
      {user.userId === "" ? (
        <p className="conditional-msg">*Select user to display user details</p>
      ) : (
        <div>
          <div>
            <Link to={"/users"}>
              <div>
                <img
                  src={backIcon}
                  className="btn btn-primary back-icon mb-3"
                />
              </div>
            </Link>
          </div>
          <div className="user-details-container">
            <div>
              <p className="user-details-name">{user.userName}</p>
              <p className="user-details">{user.email}</p>
              <p className="user-details">{user.phoneNo}</p>
            </div>

            {displayAddresses && (
              <div className="address-container">
                <div className="address-header">
                  <p className="heading">Addresses</p>
                  <p className="btn btn-primary" onClick={showAddressForm}>
                    <b>+</b>
                  </p>
                </div>

                <div>
                  {addresses.map((eachAddress) => (
                    <div
                      key={eachAddress.addressId}
                      className="eachAddress-card mb-3"
                    >
                      <div className="address-details">
                        <label className="address-labels">DoorNo: </label>
                        <p>{eachAddress.doorNo}</p>
                      </div>

                      <div className="address-details">
                        <label className="address-labels">Street: </label>
                        <p>{eachAddress.street}</p>
                      </div>
                      <div className="address-details">
                        <label className="address-labels">City: </label>
                        <p>{eachAddress.city}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!displayAddresses && (
              <div className="add-address-container">
                <div className="add-address-header">
                  <p className="heading">Add Address</p>
                  <p className="btn btn-primary" onClick={showAddresses}>
                    Back
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="input-layout mb-2">
                    <label>Door No: </label>
                    <input
                      type="text"
                      name="doorNo"
                      placeholder="enter doorNo"
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>

                  <div className="input-layout mb-2">
                    <label>Street: </label>
                    <input
                      type="text"
                      name="street"
                      placeholder="enter street"
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>

                  <div className="input-layout mb-2">
                    <label>City: </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="enter city"
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div className="centered">
                    <button className="btn btn-success">
                      {isLoading ? "Adding" : "Add Address"}
                    </button>
                  </div>
                  <p className="centered error-text mt-2">{error}</p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
