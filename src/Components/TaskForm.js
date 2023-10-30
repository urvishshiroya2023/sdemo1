import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import uuid from "react-uuid";
import { addTask, editTask, getTaskById } from "../Contants/Contants";
import { useForm } from "../Hooks/useForm";

const TaskForm = () => {
  const { id } = useParams();
  const [showAlert, setshowAlert] = useState(false);
  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    title: "",
    desc: "",
    priority: "",
    duedate: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    desc: "",
    priority: "",
    duedate: "",
  });

  useEffect(() => {
    if (id) {
      const task = getTaskById(id);
      setForm(task);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate Title
    if (inputValues.title.trim() === "") {
      newErrors.title = "Title is required.";
    } else if (inputValues.title.length > 15) {
      newErrors.title = "Title must be 15 characters or less.";
    } else {
      newErrors.title = "";
    }

    // Validate Description
    if (inputValues.desc.trim() === "") {
      newErrors.desc = "Description is required.";
    } else if (inputValues.desc.split(/\s+/).length > 20) {
      newErrors.desc = "Description must be 20 words or less.";
    } else {
      newErrors.desc = "";
    }

    // Validate Priority
    if (inputValues.priority === "") {
      newErrors.priority = "Priority is required.";
    } else {
      newErrors.priority = "";
    }

    // Validate Due Date
    const today = new Date();
    const dueDate = new Date(inputValues.duedate);
    if (dueDate < today) {
      newErrors.duedate = "Due Date must be today or a future date.";
    } else {
      newErrors.duedate = "";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      id ? editTask(id, inputValues) : addTask({ id: uuid(), ...inputValues });
      resetForm();
      setshowAlert(true);
      setTimeout(() => {
        setshowAlert(false);
      }, 2000);
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between">
        <div>
          <h2>{id ? "Edit" : "Add New"} Task</h2>
        </div>
        <div>
          <Link to={"/info"}>
            <button className="btn btn-dark">Back</button>
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <div class="col">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              class="form-control"
              id="title"
              name="title"
              value={inputValues.title}
              onChange={handleInputChange}
              placeholder="Enter Title Name"
              aria-label="title"
            />
            <p className="text-danger">{errors.title}</p>
          </div>
        </div>
        <div className="mt-2">
          <label for="desc" class="form-label">
            Task Description:
          </label>
          <textarea
            class="form-control"
            id="desc"
            name="desc"
            rows="4"
            cols="50"
            value={inputValues.desc}
            onChange={handleInputChange}
          ></textarea>
          <p className="text-danger">{errors.desc}</p>
        </div>
        <div className="mt-2">
          <label for="priority">Priority of Task:</label>
          <select
            class="form-select"
            name="priority"
            id="priority"
            value={inputValues.priority}
            onChange={handleInputChange}
            aria-label="Default select example"
          >
            <option selected>Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <p className="text-danger">{errors.priority}</p>
        </div>
        <div className="mt-2">
          <label for="duedate">Due Date:</label>
          <input
            className="ms-2"
            type="date"
            id="duedate"
            name="duedate"
            value={inputValues.duedate}
            onChange={handleInputChange}
          ></input>
          <p className="text-danger">{errors.duedate}</p>
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
