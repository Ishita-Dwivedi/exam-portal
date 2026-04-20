import { useState } from "react";
import { loginUser } from "../services/api";
import "../App.css";

function Login({ setLoggedIn, setPage }) {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await loginUser(user);
      alert(res.data);

      if (res.data === "Login successful") {
        setLoggedIn(true);
        setPage("exam");
      }
    } catch (err) {
      alert("Error logging in");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button onClick={handleLogin}>Login</button>

        <span className="link" onClick={() => setPage("register")}>
          New user? Register here
        </span>
      </div>
    </div>
  );
}

export default Login;