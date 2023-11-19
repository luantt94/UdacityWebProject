import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="page-not-found" align="center">
      <label>404 Page Not Found </label>
      <br></br>
      <Link to="/">Go to login page</Link>
    </div>
  );
};

export default Page404;
