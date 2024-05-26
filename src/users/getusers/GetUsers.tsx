import axios from "axios";
import { useEffect, useState } from "react";
import { User as UserInterface } from "../../types/User";
import User from "./User";
import "./GetUsers.scss";
import { Link } from "react-router-dom";

const GetUsers: React.FC<{ displayUser: (user: UserInterface) => void }> = ({
  displayUser,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/users");
        setUsers(response.data as UserInterface[]);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error Occurred: {error}</p>;
  }

  return (
    <div>
      {users.length === 0 ? (
        <div>
          <p className="conditional-msg">No users data available</p>
          <p className="conditional-msg">
            *Add users from{" "}
            <Link to={"/adduser"}>
              <span className="btn btn-primary">here</span>
            </Link>
          </p>
        </div>
      ) : (
        <div>
          <div>
            <Link to={"/adduser"}>
              <div className="mb-3 add-user-btn">
                <button className="btn btn-success">Add User</button>
              </div>
            </Link>
          </div>
          <div className="users-container">
            {users.map((eachUser) => (
              <User
                key={eachUser.userId}
                user={eachUser}
                displayUser={displayUser}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GetUsers;
