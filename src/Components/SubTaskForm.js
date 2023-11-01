import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import * as Yup from "yup";

const SubtaskForm = ({ onSubtaskAdded }) => {
    const { taskId } = useParams(); // Retrieve the taskId and subtaskId from the URL parameters

    console.log(taskId)

    let mainId = taskId.split(":");

    // Retrieve the subtask data based on the UUID (subtaskId)
    console.log(localStorage.getItem(mainId[0]))
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
        priority: "low", // Default priority is low
        dueDate: "", // Default due date is empty
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            // Generate a UUID for the subtask
            const subtaskId = uuidv4();

            // Save or update subtask to local storage with taskId and generated subtask ID
            const subtasks = JSON.parse(localStorage.getItem(taskId)) || [];
            const existingSubtaskIndex = subtasks.findIndex(subtask => subtask.id === subtaskId);
            if (existingSubtaskIndex !== -1) {
                // If the subtask with the same ID exists, update it
                subtasks[existingSubtaskIndex] = { id: subtaskId, ...values };
            } else {
                // Otherwise, add a new subtask
                subtasks.push({ id: subtaskId, ...values });
            }
            localStorage.setItem(taskId, JSON.stringify(subtasks));

            // Update the subtask list immediately
            onSubtaskAdded({ id: subtaskId, ...values });

            // Clear the input fields and reset the form
            resetForm();

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
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
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