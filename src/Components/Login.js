import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    // Validate email and password
    const newErrors = {};

    if (input.email.trim() === "") {
      newErrors.email = "Email is required.";
    } else if (input.email !== loggedUser.email) {
      newErrors.email = "Invalid email.";
    } else {
      newErrors.email = "";
    }

    if (input.password.trim() === "") {
      newErrors.password = "Password is required.";
    } else if (input.password !== loggedUser.password) {
      newErrors.password = "Invalid password.";
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      localStorage.setItem("loggedin", true);
      navigate("/info");
    }
  };

  return (
    <div className="container my-5">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={input.email}
            name="email"
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
          <p className="text-danger">{errors.email}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={input.password}
            name="password"
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
          <p className="text-danger">{errors.password}</p>
        </div>
        <div>
          <p>
            Don't have an account? <Link to={"/register"}>Register Here</Link>
          </p>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
