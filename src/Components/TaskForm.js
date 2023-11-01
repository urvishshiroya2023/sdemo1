import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import uuid from "react-uuid";
import * as Yup from "yup";
import { addTask, editTask, getTaskById } from "../Contants/Contants";

const TaskForm = () => {
  const { id } = useParams();
  const [showAlert, setshowAlert] = useState(false);

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required.")
      .max(15, "Title must be 15 characters or less."),
    desc: Yup.string()
      .required("Description is required.")
      .max(20, "Description must be 20 words or less."),
    priority: Yup.string().required("Priority is required."),
    duedate: Yup.date()
      .min(new Date(), "Due Date must be today or a future date.")
      .required("Due Date is required."),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      priority: "",
      duedate: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (id) {
        editTask(id, values);
      } else {
        addTask({ id: uuid(), ...values });
      }
      formik.resetForm();
      setshowAlert(true);
      setTimeout(() => {
        setshowAlert(false);
      }, 2000);
    },
  });

  useEffect(() => {
    if (id) {
      const task = getTaskById(id);
      formik.setValues(task);
    }
  }, [id]);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between">
        <div>
          <h2>{id ? "Edit" : "Add New"} Task</h2>
        </div>
        <div>
          <Link to="/info">
            <button className="btn btn-dark">Back</button>
          </Link>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-2">
          <div className="col">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Title Name"
              aria-label="title"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-danger">{formik.errors.title}</p>
            )}
          </div>
        </div>
        <div className="mt-2">
          <label htmlFor="desc" className="form-label">
            Task Description:
          </label>
          <textarea
            className="form-control"
            id="desc"
            name="desc"
            rows="4"
            cols="50"
            value={formik.values.desc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.desc && formik.errors.desc && (
            <p className="text-danger">{formik.errors.desc}</p>
          )}
        </div>
        <div className="mt-2">
          <label htmlFor="priority">Priority of Task:</label>
          <select
            className="form-select"
            name="priority"
            id="priority"
            value={formik.values.priority}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-label="Default select example"
          >
            <option value="" disabled>
              Select Priority
            </option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {formik.touched.priority && formik.errors.priority && (
            <p className="text-danger">{formik.errors.priority}</p>
          )}
        </div>
        <div className="mt-2">
          <label htmlFor="duedate">Due Date:</label>
          <input
            className="ms-2"
            type="date"
            id="duedate"
            name="duedate"
            value={formik.values.duedate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            min={new Date().toISOString().split("T")[0]}
          ></input>
          {formik.touched.duedate && formik.errors.duedate && (
            <p className="text-danger">{formik.errors.duedate}</p>
          )}
        </div>
        <div>
          <button className="btn btn-success mt-2" type="submit">
            {id ? "Save" : "Add "}
          </button>
        </div>
      </form>

      {showAlert && (
        <div className="">
          <div className="">
            <strong>Well done!</strong>{" "}
            {id ? "Edited Successfully" : "New Task Added"}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
