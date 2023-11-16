import { Link } from "react-router-dom";
import "./Nav.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { removeAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Nav = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);

  console.log("user");
  console.log(user);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(removeAuthedUser());

    navigate(`/login`);
  };
  return (
    <nav className="nav1 ">
      {user != null && user != "" && (
        <>
          <div>
            <ul className="nav_b">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/leaderboard">Leaderboard</Link>
              </li>
              <li>
                <Link to="/new">New</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="nav2">
              <li>
                <img
                  src={users[user].avatarURL}
                  alt=""
                  width="60"
                  height="60"
                />
                {users[user].name}
              </li>
              <li>
                <button onClick={handleLogout}>logout</button>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
