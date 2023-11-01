import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  // const onSubmit = (values) => {
  //   const loggedUser = JSON.parse(localStorage.getItem("user"));

  //   if (values.email === loggedUser.email && values.password === loggedUser.password) {

  //     localStorage.setItem("loggedin", true);
  //     toast.success("Login successful", {
  //       position: "top-right",
  //     });
  //     navigate("/info");
  //   } else {
  //     toast.error("Incorrect email or password", {
  //       position: "top-right",
  //     });
  //   }
  // };

  const onSubmit = (values) => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedUser) {
      // Non-registered user
      toast.error("Please register.", {
        position: "top-right",
      });
    } else if (
      values.email === loggedUser.email &&
      values.password === loggedUser.password
    ) {
      // Successful login
      localStorage.setItem("loggedin", true);
      toast.success("Login successful", {
        position: "top-right",
      });
      navigate("/info");
    } else {
      // Invalid password
      toast.error("Invalid password", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="container my-5">
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <Field
              type="email"
              className="form-control"
              id="email"
              name="email"
            />
            <ErrorMessage name="email" component="p" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Field
              type="password"
              className="form-control"
              id="password"
              name="password"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-danger"
            />
          </div>
          <div>
            <p>
              Don't have an account? <Link to={"/register"}>Register Here</Link>
            </p>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
