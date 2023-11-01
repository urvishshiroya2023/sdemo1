import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListTasks, removeEmployee } from "../Contants/Contants";
import SubtaskList from "./SubtaskList";

const TaskData = ({ item, setTasks }) => {
  const [subtasks, setSubtasks] = useState([]);
  const [isSubtaskListOpen, setIsSubtaskListOpen] = useState(false);

  useEffect(() => {
    const subtaskData = JSON.parse(localStorage.getItem(item.id)) || [];
    setSubtasks(subtaskData);
  }, [item.id]);

  const onSubtaskAdded = (subtask) => {
    const updatedSubtasks = [...subtasks, subtask];
    setSubtasks(updatedSubtasks);
    localStorage.setItem(item.id, JSON.stringify(updatedSubtasks));
  };

  const handleDeleteSubtask = (updatedSubtasks) => {
    setSubtasks(updatedSubtasks);
    localStorage.setItem(item.id, JSON.stringify(updatedSubtasks));
  };

  const toggleSubtaskList = () => {
    setIsSubtaskListOpen(!isSubtaskListOpen);
  };

  const navigate = useNavigate();

  const deleteEmployee = () => {
    removeEmployee(item.id);
    setTasks(getListTasks());
  }

  return (
    <tbody>
      <tr>
        <th>
          <button onClick={toggleSubtaskList}>{isSubtaskListOpen ? "-" : "+"}</button>
        </th>
        <th scope="row">{item.title}</th>
        <td>{item.desc}</td>
        <td>{item.priority}</td>
        <td>{item.duedate}</td>
        <th>
          <button className="btn btn-warning" onClick={() => navigate(`/edit-task/${item.id}`)}>Edit</button>
          <button className="ms-2 btn btn-danger" onClick={() => deleteEmployee()}>Delete</button>
        </th>
        <th>
          <button className="btn btn-info" onClick={() => navigate(`/subtaskform/${item.id}`)}>Add a Subtask</button>
          {isSubtaskListOpen && (
            <SubtaskList taskId={item.id} subtasks={subtasks} onSubtaskAdded={onSubtaskAdded} onDeleteSubtask={handleDeleteSubtask} />
          )}
        </th>
      </tr>
    </tbody>
  );
};

export default TaskData;







