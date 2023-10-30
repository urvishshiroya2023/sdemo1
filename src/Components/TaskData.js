import React from "react";
import { useNavigate } from "react-router-dom";
import { getListTasks, removeEmployee } from "../Contants/Contants";

const TaskData = ({ item, setTasks }) => {
  const navigate = useNavigate();

  const deleteEmployee = () => {
    removeEmployee(item.id);
    setTasks(getListTasks());
  }

  return (
    <tbody>
      {/* <tr>
        <th>{item.title}</th>
        <th>{item.desc}</th>
        <th>{item.priority}</th>
        <th>{item.duedate}</th>
        <th>
          <button onClick={() => navigate(`/edit-task/${item.id}`)}>Edit</button>
          <button onClick={() => deleteEmployee()}>Delete</button>
        </th>
      </tr> */}
      <tr>
        <th scope="row">{item.title}</th>
        <td>{item.desc}</td>
        <td>{item.priority}</td>
        <td>{item.duedate}</td>
        <th>
          <button className="btn btn-warning" onClick={() => navigate(`/edit-task/${item.id}`)}>Edit</button>
          <button className="ms-2 btn btn-danger" onClick={() => deleteEmployee()}>Delete</button>
        </th>
      </tr>
    </tbody>
  );
};

export default TaskData;
