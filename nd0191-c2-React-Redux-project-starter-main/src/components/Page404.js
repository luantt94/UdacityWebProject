import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Page404 = () => {
  const user = useSelector((state) => state.authedUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (user == "") {
      navigate("/login");
    }
  }, []);
  return (
    <div className="page-not-found" align="center">
      <label>404 Page Not Found </label>
    </div>
  );
};

export default Page404;
