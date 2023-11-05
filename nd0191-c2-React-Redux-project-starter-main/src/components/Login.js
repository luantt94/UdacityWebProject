import React, { useState } from "react";

const Login = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  // const handleLogin = () => {
  //   getInitialData().then(({ users }) => {
  //     const user = users[username];
  //     if (user && user.password === password) {
  //       localStorage.setItem("isLoggedIn", "true");
  //       localStorage.setItem("username", username);
  //       window.location.href = "/";
  //     } else {
  //       setError("Invalid username or password");
  //     }
  //   });
  // };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        // value={username}
        // onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        // value={password}
        // onChange={(e) => setPassword(e.target.value)}
      />
      {/* <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>} */}
      <button>Login</button>
    </div>
  );
};

export default Login;
