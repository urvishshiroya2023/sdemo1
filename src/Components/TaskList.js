import React, { useEffect, useState } from "react";
import TaskData from "../Components/TaskData";
import { getListTasks } from "../Contants/Contants";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [originalTasks, setOriginalTasks] = useState([]);
  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    const initialTasks = getListTasks();
    setTasks([...initialTasks]);
    setOriginalTasks([...initialTasks]);
  }, []);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);

    if (value === "priorityHighToLow") {
      // Sort by priority high to low
      tasks.sort((a, b) => {
        if (a.priority === "high" && b.priority !== "high") return -1;
        if (b.priority === "high" && a.priority !== "high") return 1;
        if (a.priority === "medium" && b.priority === "low") return -1;
        if (a.priority === "low" && b.priority === "medium") return 1;
        return 0;
      });
    } else if (value === "sortByDate") {
      // Sort by due date
      tasks.sort((a, b) => {
        const dateA = new Date(a.duedate);
        const dateB = new Date(b.duedate);
        return dateA - dateB;
      });
    } else {
      // Reset to the original order
      // setTasks([...originalTasks]);
    }
  };

  return (
    <div>
      <div className="d-flex my-2">
        {/* <div>
          <select
            className="form-select"
            name="priority"
            id="priority"
            aria-label="Default select example"
            onChange={handleSortChange}
            value={sortBy}
          >
            <option value="none">Sorted By</option>
            <option value="priorityHighToLow">Priority: High to Low</option>
            <option value="sortByDate">Date: Sorted By Date</option>
          </select>
        </div> */}
        {tasks.length > 0 ? (
          <div>
            <select
              className="form-select"
              name="priority"
              id="priority"
              aria-label="Default select example"
              onChange={handleSortChange}
              value={sortBy}
            >
              <option value="none">Sorted By</option>
              <option value="priorityHighToLow">Priority: High to Low</option>
              <option value="sortByDate">Date: Sorted By Date</option>
            </select>
          </div>
        ) : (
          " "
        )}
      </div>

      {tasks.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Button</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Priority</th>
              <th scope="col">Due Date</th>
              <th scope="col">Actions</th>
              <th scope="col">SubTask</th>
            </tr>
          </thead>

          {tasks.map((item) => (
            <TaskData item={item} key={item.id} setTasks={setTasks} />
          ))}
        </table>
      ) : (
        <h3>No Task Found</h3>
      )}
    </div>
  );
};

export default TaskList;
