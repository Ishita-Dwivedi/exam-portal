import { useState } from "react";
import { registerUser } from "../services/api";
import "../App.css";

function Register({ setPage }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    try {
      const res = await registerUser(user);
      alert(res.data);

      if (res.data === "User registered successfully") {
        setPage("login");
      }
    } catch (err) {
      alert("Error registering");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ textAlign: "center" }}>Register</h2>

        <input
          placeholder="Name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button onClick={handleSubmit}>Register</button>

        <span className="link" onClick={() => setPage("login")}>
          Already have an account? Login
        </span>
      </div>
    </div>
  );
}

export default Register;