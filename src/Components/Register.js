import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required.")
      .matches(/^[A-Za-z]+$/, "Please enter a valid first name (only alphabets)"),
    lastName: Yup.string()
      .required("Last name is required.")
      .matches(/^[A-Za-z]+$/, "Please enter a valid last name (only alphabets)"),
    email: Yup.string()
      .required("Email is required.")
      .email("Please enter a valid email address"),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    localStorage.setItem("user", JSON.stringify(values));
    navigate("/login");
  };

  return (
    <div className="container my-5">
      <h1>Create An Account</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="col-md-6 mt-3">
            <label htmlFor="fname">First name:</label>
            <Field
              type="text"
              id="fname"
              name="firstName"
              className="form-control"
              placeholder="First name"
              aria-label="First name"
            />
            <ErrorMessage name="firstName" component="p" className="text-danger" />
          </div>
          <div className="col-md-6 mt-3">
            <label htmlFor="lname">Last name:</label>
            <Field
              type="text"
              id="lname"
              name="lastName"
              className="form-control"
              placeholder="Last name"
              aria-label="Last name"
            />
            <ErrorMessage name="lastName" component="p" className="text-danger" />
          </div>
          <div className="col-md-6 mt-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field type="email" className="form-control" id="email" name="email" />
            <ErrorMessage name="email" component="p" className="text-danger" />
          </div>
          <div className="col-md-6">
            <label htmlFor="pwd" className="form-label">
              Password
            </label>
            <Field type="password" className="form-control" id="pwd" name="password" />
            <ErrorMessage name="password" component="p" className="text-danger" />
          </div>
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </Form>
      </Formik>
      <div className="mt-2">
        <p>
          Already have an account? <Link to={"/login"}>Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
