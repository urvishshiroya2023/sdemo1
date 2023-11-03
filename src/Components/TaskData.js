import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListTasks, removeEmployee } from "../Contants/Contants";
import SubtaskList from "./SubtaskList";

const TaskData = ({ item, setTasks, gridView, setGridView }) => {
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
    <>
      {
        gridView ? (
          <>

            <tbody>
              <tr>
                <th>
                  <button className="btn btn-secondary" onClick={toggleSubtaskList}>{isSubtaskListOpen ? "-" : "+"}</button>
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
            </tbody></>

        ) : (
          <>
            <div className="row my-3 p-2 rounded shadow" style={{ backgroundColor: "rgba(0,255,0,0.3)" }}>
              <div className="col"><button className="btn btn-secondary" onClick={toggleSubtaskList}>{isSubtaskListOpen ? "-" : "+"}</button></div>
              <div className="col">{item.title}</div>
              <div className="col">{item.desc}</div>
              <div className="col">{item.priority}</div>
              <div className="col">{item.duedate}</div>
              <div className="col"><button className="btn btn-warning" onClick={() => navigate(`/edit-task/${item.id}`)}>Edit</button>
                <button className="ms-2 btn btn-danger" onClick={() => deleteEmployee()}>Delete</button></div>
              <div className="col"><button className="btn btn-info" onClick={() => navigate(`/subtaskform/${item.id}`)}>Add a Subtask</button>
              </div>
            </div>
            <div>

              {isSubtaskListOpen && (
                <SubtaskList gridView={gridView} taskId={item.id} subtasks={subtasks} onSubtaskAdded={onSubtaskAdded} onDeleteSubtask={handleDeleteSubtask} />
              )}
            </div></>

        )
      }

    </>

  );
};

export default TaskData;







