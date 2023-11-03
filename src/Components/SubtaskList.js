import React, { useState } from "react";
import { Link } from "react-router-dom";

const SubtaskList = ({ taskId, subtasks, onSubtaskAdded, onDeleteSubtask, gridView }) => {
    const [editingSubtask, setEditingSubtask] = useState(null);

    const handleEdit = (subtask) => {
        setEditingSubtask(subtask);
    };

    const handleSaveEdit = (editedSubtask) => {
        const updatedSubtasks = subtasks.map(subtask => (subtask.id === editedSubtask.id ? editedSubtask : subtask));

        onDeleteSubtask(updatedSubtasks);

        setEditingSubtask(null);
    };

    const handleDelete = (subtask) => {
        const updatedSubtasks = subtasks.filter(item => item.id !== subtask.id);

        onDeleteSubtask(updatedSubtasks);
    };

    // console.log(subtasks);

    return (
        <div>
            {subtasks.length > 0 ? (<h5>Sub Tasks:</h5>) : (" ")}
            <ol className="mt-2">
                {subtasks.map((subtask) => (


                    <li className="mt-2" key={subtask.id}>
                        <div>
                            <strong>Title: {subtask.title}</strong>
                        </div>
                        <div>Description: {subtask.description}</div>
                        <div>Priority: {subtask.priority}</div>
                        <div>Due Date: {subtask.dueDate}</div>
                        <div>
                            {editingSubtask && editingSubtask.id === subtask.id ? (
                                <button onClick={() => handleSaveEdit(editingSubtask)}>Save</button>
                            ) : (
                                <Link
                                    to={{
                                        pathname: `/subtaskform/${taskId}:${subtask.id}`,
                                    }}
                                >
                                    <button className="btn btn-warning" onClick={() => handleEdit(subtask)}>Edit</button>
                                </Link>
                            )}
                            <button className="btn btn-danger ms-2" onClick={() => handleDelete(subtask)}>Delete</button>
                        </div>
                    </li>


                ))}
            </ol>
        </div>
    );
};

export default SubtaskList;


















