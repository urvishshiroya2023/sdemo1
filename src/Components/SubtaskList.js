// import React from "react";
// import SubtaskForm from "./SubTaskForm";

// const SubtaskList = ({ taskId, subtasks, onSubtaskAdded }) => {
//     return (
//         <div>
//             <SubtaskForm taskId={taskId} onSubtaskAdded={onSubtaskAdded} />
//             <ul>
//                 {console.log(subtasks)}
//                 {subtasks.map((subtask, index) => (
//                     <>
//                         <li key={index}>{subtask}</li>
//                         <button>Edit</button>
//                         <button>Delete</button>
//                     </>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default SubtaskList;

// import React, { useState } from "react";
// import SubtaskForm from "./SubTaskForm";

// const SubtaskList = ({ taskId, subtasks, onSubtaskAdded }) => {
//     const [editingIndex, setEditingIndex] = useState(-1);
//     const [editedSubtask, setEditedSubtask] = useState("");

//     const handleEdit = (index) => {
//         setEditingIndex(index);
//         setEditedSubtask(subtasks[index]);
//     };

//     const handleSaveEdit = (index) => {
//         const updatedSubtasks = [...subtasks];
//         updatedSubtasks[index] = editedSubtask;
//         // Update the subtasks in local storage or send it to a parent component.
//         // For now, I'll just log the updated subtasks.
//         console.log("Updated Subtasks: ", updatedSubtasks);

//         // Clear the editing state
//         setEditingIndex(-1);
//         setEditedSubtask("");
//     };

//     const handleDelete = (index) => {
//         const updatedSubtasks = subtasks.filter((_, i) => i !== index);
//         // Update the subtasks in local storage or send it to a parent component.
//         // For now, I'll just log the updated subtasks.
//         console.log("Updated Subtasks: ", updatedSubtasks);
//     };

//     return (
//         <div>
//             <SubtaskForm taskId={taskId} onSubtaskAdded={onSubtaskAdded} />
//             <ul>
//                 {subtasks.map((subtask, index) => (
//                     <li key={index}>
//                         {editingIndex === index ? (
//                             <>
//                                 <input
//                                     type="text"
//                                     value={editedSubtask}
//                                     onChange={(e) => setEditedSubtask(e.target.value)}
//                                 />
//                                 <button onClick={() => handleSaveEdit(index)}>Save</button>
//                             </>
//                         ) : (
//                             subtask
//                         )}
//                         <button onClick={() => handleEdit(index)}>Edit</button>
//                         <button onClick={() => handleDelete(index)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default SubtaskList;

import React, { useState } from "react";

const SubtaskList = ({ taskId, subtasks, onSubtaskAdded, onDeleteSubtask }) => {
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editedSubtask, setEditedSubtask] = useState("");

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditedSubtask(subtasks[index]);
    };

    const handleSaveEdit = (index) => {
        const updatedSubtasks = [...subtasks];
        updatedSubtasks[index] = editedSubtask;
        // Update the subtasks in local storage or send it to the parent component
        onDeleteSubtask(updatedSubtasks); // Call the onDeleteSubtask function

        // Clear the editing state
        setEditingIndex(-1);
        setEditedSubtask("");
    };

    const handleDelete = (index) => {
        const updatedSubtasks = subtasks.filter((_, i) => i !== index);
        // Update the subtasks in local storage 
        onDeleteSubtask(updatedSubtasks); // Call the onDeleteSubtask function
    };

    return (
        <div>
            {/* <SubtaskForm taskId={taskId} onSubtaskAdded={onSubtaskAdded} /> */}

            <ul className="mt-2">
                {subtasks.map((subtask, index) => (
                    <li className="mt-2" key={index}>
                        {editingIndex === index ? (
                            <>
                                <input
                                    placeholder="Add a sub task"
                                    type="text"
                                    value={editedSubtask}
                                    onChange={(e) => setEditedSubtask(e.target.value)}
                                />
                                <button className="btn btn-info mx-2" onClick={() => handleSaveEdit(index)}>Save</button>
                            </>
                        ) : (
                            subtask
                        )}
                        <button className="ms-2 btn btn-warning" onClick={() => handleEdit(index)}>Edit</button>
                        <button className="ms-2 btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubtaskList;




