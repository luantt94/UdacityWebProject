import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav className="nav">
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
    </nav>
  );
};

export default Header;
