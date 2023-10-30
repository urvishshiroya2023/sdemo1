import uuid from "react-uuid";

export const getListTasks = () => {
  if (!localStorage["@tasks"]) {
    localStorage["@tasks"] = JSON.stringify([]);
  }

  let tasks = JSON.parse(localStorage["@tasks"]);

  return tasks;
};

export const getTaskById = (id) => {
  const tasks = getListTasks();
  const task = tasks.find((task) => task.id === id);
  return task;
};

export const addTask = (task) => {
  const tasks = getListTasks();
  tasks.push({ id: uuid(), ...task });
  localStorage["@tasks"] = JSON.stringify(tasks);
};

export const editTask = (id, newTask) => {
  let tasks = getListTasks();
  tasks = tasks.filter((task) => task.id !== id);
  tasks.push(newTask);
  localStorage["@tasks"] = JSON.stringify(tasks);
};

export const removeEmployee = (id) => {
  let tasks = getListTasks();
  tasks = tasks.filter((task) => task.id !== id);
  localStorage["@tasks"] = JSON.stringify(tasks);
};
