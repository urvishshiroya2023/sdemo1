import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    // You can use a regular expression or a library like Yup for more complex validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isAlphabet = (text) => /^[A-Za-z]+$/.test(text);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate first name
    if (input.firstName.trim() === "") {
      newErrors.firstName = "First name is required.";
    } else if (!isAlphabet(input.firstName)) {
      newErrors.firstName = "Please enter a valid first name (only alphabets).";
    } else {
      newErrors.firstName = "";
    }

    // Validate last name
    if (input.lastName.trim() === "") {
      newErrors.lastName = "Last name is required.";
    } else if (!isAlphabet(input.lastName)) {
      newErrors.lastName = "Please enter a valid last name (only alphabets).";
    } else {
      newErrors.lastName = "";
    }

    // Validate email
    if (input.email.trim() === "") {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(input.email)) {
      newErrors.email = "Please enter a valid email address.";
    } else {
      newErrors.email = "";
    }

    // Validate password (add more complex validation as needed)
    if (input.password.trim() === "") {
      newErrors.password = "Password is required.";
    } else if (input.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else {
      newErrors.password = "";
    }

    // Update errors state
    setErrors(newErrors);

    // If there are no errors, proceed with registration
    if (Object.values(newErrors).every((error) => error === "")) {
      localStorage.setItem("user", JSON.stringify(input));
      navigate("/login");
    }
  };

  return (
    <div className="container my-5">
      <h1>Create An Account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="col-md-6 mt-3">
            <label htmlFor="fname">First name:</label>
            <input
              type="text"
              id="fname"
              name="firstName"
              value={input.firstName}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              className="form-control"
              placeholder="First name"
              aria-label="First name"
            />
            <p className="text-danger">{errors.firstName}</p>
          </div>
          <div className="col-md-6 mt-3">
            <label htmlFor="lname">Last name:</label>
            <input
              type="text"
              id="lname"
              name="lastName"
              value={input.lastName}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              className="form-control"
              placeholder="Last name"
              aria-label="Last name"
            />
            <p className="text-danger">{errors.lastName}</p>
          </div>
        </div>
        <div className="col-md-6 mt-3">
          <label htmlFor="email" className="form-label">
            Email
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
        <div className="col-md-6">
          <label htmlFor="pwd" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            value={input.password}
            name="password"
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
          <p className="text-danger">{errors.password}</p>
        </div>
        <div className="col-12 mt-3">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
      <div className="mt-2">
        <p>
          Already have an account? <Link to={"/login"}>Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
