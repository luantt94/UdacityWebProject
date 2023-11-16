import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  console.log("go to login");
  const navigate = useNavigate();
  const handleLogin = () => {
    var e = document.getElementById("selectUser");
    var value = e.value;
    props.dispatch(setAuthedUser(value));
    // navigate(`/`);
    navigate(-1);
  };
  return (
    <>
      <label>Login as </label>
      <select name="selectUser" id="selectUser">
        {Object.keys(props.users).map((id, i) => (
          <option key={id} value={id}>
            {props.users[id].name}
          </option>
        ))}
      </select>
      <br />
      <button className="btn" onClick={handleLogin}>
        Login
      </button>
    </>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Login);
