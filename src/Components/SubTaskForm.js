// import { useFormik } from "formik";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { v4 as uuidv4 } from 'uuid';
// import * as Yup from "yup";

// const SubtaskForm = ({ onSubtaskAdded }) => {
//     const { taskId } = useParams();
//     const mainId = taskId.split(":");
//     const subtaskToEdit = JSON.parse(localStorage.getItem(mainId[0]))?.find(subtask => subtask.id === mainId[1]);
//     const navigate = useNavigate();

//     const validationSchema = Yup.object({
//         title: Yup.string().required("Title is required"),
//         description: Yup.string().required("Description is required"),
//         priority: Yup.string().required("Priority is required"),
//         dueDate: Yup.date().min(new Date(), "Due date should be today or in the future"),
//     });

//     const initialValues = subtaskToEdit || {
//         title: "",
//         description: "",
//         priority: "low",
//         dueDate: "",
//     };

//     const formik = useFormik({
//         initialValues,
//         validationSchema,
//         onSubmit: (values) => {
//             const subtasks = JSON.parse(localStorage.getItem(mainId[0])) || [];

//             // Find the index of the subtask to edit, if it exists
//             const subtaskIndexToEdit = subtasks.findIndex(subtask => subtask.id === mainId[1]);

//             if (subtaskIndexToEdit !== -1) {
//                 // If the subtask with the same ID exists, update it
//                 subtasks[subtaskIndexToEdit] = { id: mainId[1], ...values };
//             } else {
//                 // Otherwise, add a new subtask
//                 const subtaskId = uuidv4();
//                 subtasks.push({ id: subtaskId, ...values });
//             }

//             // Save the updated subtasks to local storage
//             localStorage.setItem(mainId[0], JSON.stringify(subtasks));

//             // Update the subtask list immediately
//             onSubtaskAdded({ id: mainId[1], ...values });

//             // Navigate back to TaskData component
//             navigate(`/info`);
//         },
//     });

//     return (
//         <div>
//             <form onSubmit={formik.handleSubmit}>
//                 {['title', 'description', 'priority', 'dueDate'].map((fieldName) => (
//                     <div key={fieldName}>
//                         <label>{fieldName === 'dueDate' ? 'Due Date' : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:</label>
//                         {fieldName === 'description' ? (
//                             <textarea
//                                 name={fieldName}
//                                 value={formik.values[fieldName]}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                             />
//                         ) : (
//                             <input
//                                 type={fieldName === 'dueDate' ? 'date' : 'text'}
//                                 name={fieldName}
//                                 value={formik.values[fieldName]}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                             />
//                         )}
//                         {formik.touched[fieldName] && formik.errors[fieldName] && (
//                             <p className="text-danger">{formik.errors[fieldName]}</p>
//                         )}
//                     </div>
//                 ))}
//                 <button className="btn btn-success mt-2" type="submit">
//                     {subtaskToEdit ? "Update Subtask" : "Add Subtask"}
//                 </button>
//             </form>
//             <div>
//                 <Link to="/info">
//                     <button className="btn btn-dark mt-2">Back</button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default SubtaskForm;


import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import * as Yup from "yup";

const SubtaskForm = ({ onSubtaskAdded }) => {
    const { taskId } = useParams();
    const mainId = taskId.split(":");
    const subtaskToEdit = JSON.parse(localStorage.getItem(mainId[0]))?.find(subtask => subtask.id === mainId[1]);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        priority: Yup.string().required("Priority is required"),
        dueDate: Yup.date().min(new Date(), "Due date should be today or in the future"),
    });

    const initialValues = subtaskToEdit || {
        title: "",
        description: "",
        priority: "high", // Set the default priority to "high"
        dueDate: "",
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            const subtasks = JSON.parse(localStorage.getItem(mainId[0])) || [];

            // Find the index of the subtask to edit, if it exists
            const subtaskIndexToEdit = subtasks.findIndex(subtask => subtask.id === mainId[1]);

            if (subtaskIndexToEdit !== -1) {
                // If the subtask with the same ID exists, update it
                subtasks[subtaskIndexToEdit] = { id: mainId[1], ...values };
            } else {
                // Otherwise, add a new subtask
                const subtaskId = uuidv4();
                subtasks.push({ id: subtaskId, ...values });
            }

            // Save the updated subtasks to local storage
            localStorage.setItem(mainId[0], JSON.stringify(subtasks));

            // Update the subtask list immediately
            onSubtaskAdded({ id: mainId[1], ...values });

            // Navigate back to TaskData component
            navigate(`/info`);
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.title && formik.errors.title && (
                        <p className="text-danger">{formik.errors.title}</p>
                    )}
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <p className="text-danger">{formik.errors.description}</p>
                    )}
                </div>
                <div>
                    <label>Priority:</label>
                    <select
                        name="priority"
                        value={formik.values.priority}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    {formik.touched.priority && formik.errors.priority && (
                        <p className="text-danger">{formik.errors.priority}</p>
                    )}
                </div>
                <div>
                    <label>Due Date:</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={formik.values.dueDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.dueDate && formik.errors.dueDate && (
                        <p className="text-danger">{formik.errors.dueDate}</p>
                    )}
                </div>
                <button className="btn btn-success mt-2" type="submit">
                    {subtaskToEdit ? "Update Subtask" : "Add Subtask"}
                </button>
            </form>
            <div>
                <Link to="/info">
                    <button className="btn btn-dark mt-2">Back</button>
                </Link>
            </div>
        </div>
    );
};

export default SubtaskForm;




