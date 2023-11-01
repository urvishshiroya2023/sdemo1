// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getListTasks, removeEmployee } from "../Contants/Contants";
// import SubtaskList from "./SubtaskList";

// const TaskData = ({ item, setTasks }) => {
//   const [subtasks, setSubtasks] = useState([]);

//   useEffect(() => {
//     // Retrieve subtasks from local storage when the component first mounts
//     const subtaskData = JSON.parse(localStorage.getItem(item.id)) || [];
//     setSubtasks(subtaskData);
//   }, [item.id]);


//   // const onSubtaskAdded = (subtask) => {
//   //   setSubtasks([...subtasks, subtask]);
//   // };

//   const onSubtaskAdded = (subtask) => {
//     const updatedSubtasks = [...subtasks, subtask];
//     setSubtasks(updatedSubtasks);

//     // Update local storage with the new subtasks data
//     localStorage.setItem(item.id, JSON.stringify(updatedSubtasks));
//   };


//   const navigate = useNavigate();

//   const deleteEmployee = () => {
//     removeEmployee(item.id);
//     setTasks(getListTasks());
//   }

//   return (
//     <tbody>
//       {/* <tr>
//         <th>{item.title}</th>
//         <th>{item.desc}</th>
//         <th>{item.priority}</th>
//         <th>{item.duedate}</th>
//         <th>
//           <button onClick={() => navigate(`/edit-task/${item.id}`)}>Edit</button>
//           <button onClick={() => deleteEmployee()}>Delete</button>
//         </th>
//       </tr> */}
//       <tr>
//         <th scope="row">{item.title}</th>
//         <td>{item.desc}</td>
//         <td>{item.priority}</td>
//         <td>{item.duedate}</td>
//         <th>
//           <button className="btn btn-warning" onClick={() => navigate(`/edit-task/${item.id}`)}>Edit</button>
//           <button className="ms-2 btn btn-danger" onClick={() => deleteEmployee()}>Delete</button>
//           {/* <button className="ms-2 btn btn-success"><Link to={"/subtaskform"}>Add Sub Task</Link></button> */}
//           {/* <SubtaskForm taskId={item.id} /> */}
//           <SubtaskList taskId={item.id} subtasks={subtasks} onSubtaskAdded={onSubtaskAdded} />
//         </th>
//       </tr>
//     </tbody>
//   );
// };

// export default TaskData;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getListTasks, removeEmployee } from "../Contants/Contants";
// import SubtaskForm from "./SubTaskForm";
// import SubtaskList from "./SubtaskList";

// const TaskData = ({ item, setTasks }) => {
//   const [subtasks, setSubtasks] = useState([]);

//   useEffect(() => {
//     // Retrieve subtasks from local storage when the component first mounts
//     const subtaskData = JSON.parse(localStorage.getItem(item.id)) || [];
//     setSubtasks(subtaskData);
//   }, [item.id]);

//   const onSubtaskAdded = (subtask) => {
//     const updatedSubtasks = [...subtasks, subtask];
//     setSubtasks(updatedSubtasks);

//     // Update local storage with the new subtasks data
//     localStorage.setItem(item.id, JSON.stringify(updatedSubtasks));
//   };

//   const handleDeleteSubtask = (updatedSubtasks) => {
//     setSubtasks(updatedSubtasks);

//     // Update local storage with the updated subtasks data
//     localStorage.setItem(item.id, JSON.stringify(updatedSubtasks));
//   };

//   const navigate = useNavigate();

//   const deleteEmployee = () => {
//     removeEmployee(item.id);
//     setTasks(getListTasks());
//   }

//   return (
//     <tbody>
//       <tr>
//         <th><button>+</button></th>
//         <th scope="row">{item.title}</th>
//         <td>{item.desc}</td>
//         <td>{item.priority}</td>
//         <td>{item.duedate}</td>
//         <th>
//           <button className="btn btn-warning" onClick={() => navigate(`/edit-task/${item.id}`)}>Edit</button>
//           <button className="ms-2 btn btn-danger" onClick={() => deleteEmployee()}>Delete</button>
//         </th>
//         <th>
//           {/* <button>
//             <Link to={"/subtaskform"} onSubtaskAdded={onSubtaskAdded} taskId={item.id} >
//               Add Sub Task
//             </Link>
//           </button> */}
//           <SubtaskForm onSubtaskAdded={onSubtaskAdded} taskId={item.id} />
//           <SubtaskList taskId={item.id} subtasks={subtasks} onSubtaskAdded={onSubtaskAdded} onDeleteSubtask={handleDeleteSubtask} />
//         </th>
//       </tr>

//     </tbody>
//   );
// };

// export default TaskData;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getListTasks, removeEmployee } from "../Contants/Contants";
// import SubtaskForm from "./SubTaskForm";
// import SubtaskList from "./SubtaskList";

// const TaskData = ({ item, setTasks }) => {
//   const [subtasks, setSubtasks] = useState([]);
//   const [isSubtaskListOpen, setIsSubtaskListOpen] = useState(false); // Added state for toggling subtask list

//   useEffect(() => {
//     // Retrieve subtasks from local storage when the component first mounts
//     const subtaskData = JSON.parse(localStorage.getItem(item.id)) || [];
//     setSubtasks(subtaskData);
//   }, [item.id]);

//   const onSubtaskAdded = (subtask) => {
//     const updatedSubtasks = [...subtasks, subtask];
//     setSubtasks(updatedSubtasks);

//     // Update local storage with the new subtasks data
//     localStorage.setItem(item.id, JSON.stringify(updatedSubtasks));
//   };

//   const handleDeleteSubtask = (updatedSubtasks) => {
//     setSubtasks(updatedSubtasks);

//     // Update local storage with the updated subtasks data
//     localStorage.setItem(item.id, JSON.stringify(updatedSubtasks));
//   };

//   const toggleSubtaskList = () => {
//     setIsSubtaskListOpen(!isSubtaskListOpen); // Toggle the state to open/close the subtask list
//   };

//   const navigate = useNavigate();

//   const deleteEmployee = () => {
//     removeEmployee(item.id);
//     setTasks(getListTasks());
//   }

//   return (
//     <tbody>
//       <tr>
//         <th>
//           <button onClick={toggleSubtaskList}>+</button>
//         </th>
//         <th scope="row">{item.title}</th>
//         <td>{item.desc}</td>
//         <td>{item.priority}</td>
//         <td>{item.duedate}</td>
//         <th>
//           <button className="btn btn-warning" onClick={() => navigate(`/edit-task/${item.id}`)}>Edit</button>
//           <button className="ms-2 btn btn-danger" onClick={() => deleteEmployee()}>Delete</button>
//         </th>
//         <th>
//           <SubtaskForm onSubtaskAdded={onSubtaskAdded} taskId={item.id} />
//           {isSubtaskListOpen && (
//             <>
//               <SubtaskList taskId={item.id} subtasks={subtasks} onSubtaskAdded={onSubtaskAdded} onDeleteSubtask={handleDeleteSubtask} />
//             </>
//           )}
//         </th>
//       </tr>
//     </tbody>
//   );
// };

// export default TaskData;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getListTasks, removeEmployee } from "../Contants/Contants";
// import SubtaskForm from "./SubTaskForm";
// import SubtaskList from "./SubtaskList";

// const TaskData = ({ item, setTasks }) => {
//   const [subtasks, setSubtasks] = useState([]);
//   const [isSubtaskListOpen, setIsSubtaskListOpen] = useState(false); // Added state for toggling subtask list

//   useEffect(() => {
//     // Retrieve subtasks from local storage when the component first mounts
//     const subtaskData = JSON.parse(localStorage.getItem(item.id)) || [];
//     setSubtasks(subtaskData);
//   }, [item.id]);

//   const onSubtaskAdded = (subtask) => {
//     const updatedSubtasks = [...subtasks, subtask];
//     setSubtasks(updatedSubtasks);

//     // Update local storage with the new subtasks data
//     localStorage.setItem(item.id, JSON.stringify(updatedSubtasks));
//   };

//   const handleDeleteSubtask = (updatedSubtasks) => {
//     setSubtasks(updatedSubtasks);

//     // Update local storage with the updated subtasks data
//     localStorage.setItem(item.id, JSON.stringify(updatedSubtasks));
//   };

//   const toggleSubtaskList = () => {
//     setIsSubtaskListOpen(!isSubtaskListOpen); // Toggle the state to open/close the subtask list
//   };

//   const navigate = useNavigate();

//   const deleteEmployee = () => {
//     removeEmployee(item.id);
//     setTasks(getListTasks());
//   }

//   return (
//     <tbody>
//       <tr>
//         <th>
//           <button onClick={toggleSubtaskList}>+</button>
//         </th>
//         <th scope="row">{item.title}</th>
//         <td>{item.desc}</td>
//         <td>{item.priority}</td>
//         <td>{item.duedate}</td>
//         <th>
//           <button className="btn btn-warning" onClick={() => navigate(`/edit-task/${item.id}`)}>Edit</button>
//           <button className="ms-2 btn btn-danger" onClick={() => deleteEmployee()}>Delete</button>
//         </th>
//         <th>
//           {isSubtaskListOpen && (
//             <SubtaskList taskId={item.id} subtasks={subtasks} onSubtaskAdded={onSubtaskAdded} onDeleteSubtask={handleDeleteSubtask} />
//           )}
//           <button onClick={() => navigate(`/subtaskform/${item.id}`)}>Add a Subtask</button>
//           <SubtaskForm onSubtaskAdded={onSubtaskAdded} taskId={item.id} />
//         </th>
//       </tr>
//     </tbody>
//   );
// };

// export default TaskData;


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







