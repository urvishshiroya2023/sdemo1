// import { useFormik } from "formik";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import * as Yup from "yup";

// const SubtaskForm = ({ onSubtaskAdded }) => {
//   const { taskId } = useParams();
//   const mainId = taskId.split(":");
//   const subtaskToEdit = JSON.parse(localStorage.getItem(mainId[0]))?.find(
//     (subtask) => subtask.id === mainId[1]
//   );
//   const navigate = useNavigate();

//   const validationSchema = Yup.object({
//     title: Yup.string().required("Title is required"),
//     description: Yup.string().required("Description is required"),
//     priority: Yup.string().required("Priority is required"),
//     dueDate: Yup.date().min(
//       new Date(),
//       "Due date should be today or in the future"
//     ),
//   });

//   const initialValues = subtaskToEdit || {
//     title: "",
//     description: "",
//     priority: "high",
//     dueDate: "",
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: (values) => {
//       const subtasks = JSON.parse(localStorage.getItem(mainId[0])) || [];

//       const subtaskIndexToEdit = subtasks.findIndex(
//         (subtask) => subtask.id === mainId[1]
//       );

//       if (subtaskIndexToEdit !== -1) {
//         subtasks[subtaskIndexToEdit] = { id: mainId[1], ...values };
//       } else {
//         const subtaskId = uuidv4();
//         subtasks.push({ id: subtaskId, ...values });
//       }

//       localStorage.setItem(mainId[0], JSON.stringify(subtasks));

//       onSubtaskAdded({ id: mainId[1], ...values });

//       // Reset the form
//       formik.setValues(initialValues);

//       // Navigate to another page after resetting the form
//       navigate(`/info`);
//     },
//   });

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             name="title"
//             value={formik.values.title}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.title && formik.errors.title && (
//             <p className="text-danger">{formik.errors.title}</p>
//           )}
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             name="description"
//             value={formik.values.description}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.description && formik.errors.description && (
//             <p className="text-danger">{formik.errors.description}</p>
//           )}
//         </div>
//         <div>
//           <label>Priority:</label>
//           <select
//             name="priority"
//             value={formik.values.priority}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           >
//             <option value="high">High</option>
//             <option value="medium">Medium</option>
//             <option value="low">Low</option>
//           </select>
//           {formik.touched.priority && formik.errors.priority && (
//             <p className="text-danger">{formik.errors.priority}</p>
//           )}
//         </div>
//         <div>
//           <label>Due Date:</label>
//           <input
//             type="date"
//             name="dueDate"
//             value={formik.values.dueDate}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             min={new Date().toISOString().split("T")[0]}
//           />
//           {formik.touched.dueDate && formik.errors.dueDate && (
//             <p className="text-danger">{formik.errors.dueDate}</p>
//           )}
//         </div>
//         <button className="btn btn-success mt-2" type="submit">
//           {subtaskToEdit ? "Update Subtask" : "Add Subtask"}
//         </button>
//       </form>
//       <div>
//         <Link to="/info">
//           <button className="btn btn-dark mt-2">Back</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default SubtaskForm;

import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

const SubtaskForm = ({ onSubtaskAdded }) => {
  const { taskId } = useParams();
  const mainId = taskId.split(":");
  const subtaskToEdit = JSON.parse(localStorage.getItem(mainId[0]))?.find(
    (subtask) => subtask.id === mainId[1]
  );
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    priority: Yup.string().required("Priority is required"),
    dueDate: Yup.date().min(
      new Date(),
      "Due date should be today or in the future"
    ),
  });

  const initialValues = subtaskToEdit || {
    title: "",
    description: "",
    priority: "high",
    dueDate: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const subtasks = JSON.parse(localStorage.getItem(mainId[0])) || [];

      const subtaskIndexToEdit = subtasks.findIndex(
        (subtask) => subtask.id === mainId[1]
      );

      if (subtaskIndexToEdit !== -1) {
        subtasks[subtaskIndexToEdit] = { id: mainId[1], ...values };
      } else {
        const subtaskId = uuidv4();
        subtasks.push({ id: subtaskId, ...values });
      }

      localStorage.setItem(mainId[0], JSON.stringify(subtasks));

      // Call the onSubtaskAdded function if it's defined
      if (typeof onSubtaskAdded === "function") {
        onSubtaskAdded({ id: mainId[1], ...values });
      }

      // Reset the form
      formik.resetForm();

      // Navigate to another page after resetting the form
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
            min={new Date().toISOString().split("T")[0]}
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
