import { User as UserInterface } from "../../types/User";
import userIcon from "../../assets/user.svg";
import "./User.scss";
import { Link } from "react-router-dom";

interface UserProps {
  user: UserInterface;
  displayUser: (user: UserInterface) => void;
}

const User: React.FC<UserProps> = ({ user, displayUser }) => {
  return (
    <div>
      <Link to={"/userdetails"} className="link-text">
        <div className="user-card" onClick={() => displayUser(user)}>
          <div>
            <p className="user-name">{user.userName}</p>
            <p className="user-email">{user.email}</p>
          </div>
          <div>
            <img src={userIcon} alt="user-icon" className="user-icon" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default User;
