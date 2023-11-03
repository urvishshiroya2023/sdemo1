import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Body from "./Components/Body";
import Login from "./Components/Login";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Register from "./Components/Register";
import SubtaskForm from "./Components/SubTaskForm";
import TaskForm from "./Components/TaskForm";
import Home from "./Pages/Home";
import Info from "./Pages/Info";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/info",
        element: <Info />,
      },
      {
        path: "/addtask",
        element: <TaskForm />,
      },
      {
        path: "/edit-task/:id",
        element: <TaskForm />,
      },
      {
        path: "/subtaskform/:taskId",
        element: <SubtaskForm />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" element={<Info />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
