import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TaskList from "../Components/TaskList";

const Info = () => {
  const userData = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    navigate("/login");
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between">
        <div>
          Welcome To DashBoard -{" "}
          <span className="text-success">
            {userData.firstName + " " + userData.lastName}
          </span>{" "}
        </div>
        <div>
          <Link className="btn btn-primary" to={"/"}>
            Home
          </Link>

          <button
            type="button"
            className="btn btn-danger ms-2"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
      <div>
        <div className="mt-2">
          <h4>Personal Data:</h4>
          <p>FirstName : {userData.firstName}</p>
          <p>LastName : {userData.lastName}</p>
        </div>
        {/* <button type="button" onClick={handleLogout}>
          Log Out
        </button> */}
      </div>
      <div className="d-flex mt-4 justify-content-between">
        <div>
          <h5>Task List:</h5>
        </div>
        <div className="d-flex">
          <div>
            {/* <label for="priority">Sort By:</label> */}
            {/* <select
              class="form-select"
              name="priority"
              id="priority"
              aria-label="Default select example"
            >
              <option selected>Sorted By</option>
              <option value="priorityhitghtolow">Priority : High to Low</option>
              <option value="sortedbydate">Date : Sorted By Date</option>
            </select> */}
          </div>
          <div className="ms-2">
            <Link to={"/addtask"}>
              <button className="btn btn-info">Add Task</button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <TaskList />
        {/* <TaskData /> */}
      </div>
    </div>
  );
};

export default Info;
