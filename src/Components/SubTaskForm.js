// SubtaskForm.js
// import React, { useState } from "react";

// const SubtaskForm = ({ taskId, onSubtaskAdded }) => {
//     const [subtask, setSubtask] = useState("");

//     const handleAddSubtask = () => {
//         // Save subtask to local storage
//         const subtasks = JSON.parse(localStorage.getItem(taskId)) || [];
//         subtasks.push(subtask);
//         localStorage.setItem(taskId, JSON.stringify(subtasks));

//         // Update the subtask list immediately
//         onSubtaskAdded(subtask);

//         // Clear the input field
//         setSubtask("");
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={subtask}
//                 onChange={(e) => setSubtask(e.target.value)}
//             />
//             <button className="btn btn-success ms-2" onClick={handleAddSubtask}>Add Subtask</button>
//         </div>
//     );
// };

// export default SubtaskForm;


// import { useFormik } from "formik";
// import React from "react";
// import * as Yup from "yup";

// const SubtaskForm = ({ taskId, onSubtaskAdded }) => {

//     const validationSchema = Yup.object({
//         subtask: Yup.string()
//             .required("Subtask is required")
//             .max(20, "Subtask should not exceed 20 characters"),
//     });

//     const initialValues = {
//         subtask: "",
//     };

//     const formik = useFormik({
//         initialValues,
//         validationSchema,
//         onSubmit: (values) => {
//             // Save subtask to local storage
//             const subtasks = JSON.parse(localStorage.getItem(taskId)) || [];
//             subtasks.push(values.subtask);
//             localStorage.setItem(taskId, JSON.stringify(subtasks));

//             // Update the subtask list immediately
//             onSubtaskAdded(values.subtask);

//             // Clear the input field
//             formik.resetForm();
//         },
//     });

//     return (
//         <div>
//             <form onSubmit={formik.handleSubmit}>
//                 <input
//                     type="text"
//                     name="subtask"
//                     value={formik.values.subtask}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                 />
//                 {formik.touched.subtask && formik.errors.subtask && (
//                     <p className="text-danger">{formik.errors.subtask}</p>
//                 )}
//                 <button className="btn btn-success ms-2" type="submit">
//                     Add Subtask
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default SubtaskForm;

import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

const SubtaskForm = ({ onSubtaskAdded }) => {
    const { taskId } = useParams(); // Retrieve the taskId from the URL parameters

    const navigate = useNavigate();
    const validationSchema = Yup.object({
        subtask: Yup.string()
            .required("Subtask is required")
            .max(20, "Subtask should not exceed 20 characters"),
    });

    const initialValues = {
        subtask: "",
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            // Save subtask to local storage with taskId
            const subtasks = JSON.parse(localStorage.getItem(taskId)) || [];
            subtasks.push(values.subtask);
            localStorage.setItem(taskId, JSON.stringify(subtasks));

            // Update the subtask list immediately
            onSubtaskAdded(values.subtask);

            // Clear the input field
            formik.resetForm();

            // Clear the input field and reset the form
            resetForm({ values: '' });

            // Navigate back to TaskData component
            navigate(`/info`); // You may need to adjust the route path
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    name="subtask"
                    value={formik.values.subtask}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.subtask && formik.errors.subtask && (
                    <p className="text-danger">{formik.errors.subtask}</p>
                )}
                <button className="btn btn-success ms-2" type="submit">
                    Add Subtask
                </button>
            </form>
        </div>
    );
};

export default SubtaskForm;

