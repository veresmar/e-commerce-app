import { useState, useEffect } from "react";
import TaskFilter from "./Filter";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { Typography } from "@mui/material";

import ListItem from "./ListItem";

import { v4 as uuidv4 } from "uuid";

function getFilteredTasks(
  filter: "all" | "active" | "completed",
  tasksList: Task[],
) {
  if (filter == "completed") {
    return tasksList.filter((task) => task.done == true);
  } else if (filter == "active") {
    return tasksList.filter((task) => task.done == false);
  } else {
    return tasksList;
  }
}

export type Task = {
  id: string; // new date - генерим id, ИЛИ uuid (библиотека)
  text: string;
  done: boolean;
};

export default function ToDo() {
  const [newTask, setNewTask] = useState("");
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");

  function addTask(e: React.ChangeEvent<HTMLInputElement>) {
    if (newTask.length > 0) {
      const newTaskObj: Task = { id: uuidv4(), text: newTask, done: false };
      setTasksList([...tasksList, newTaskObj]);
    }
    setNewTask(e.target.value);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(e.target.value);
    // if (tasksList.length == 0) {
    //   <p>no tasks</p>
    // }
  }
  function removeTask(taskToRemove: Task) {
    setTasksList([...tasksList].filter((task) => taskToRemove.id != task.id));
  }

  const handleToggle = (task: Task) => {
    // const currentIndex = checked.indexOf(task.id);
    // const newChecked = [...checked];
    // if (currentIndex === -1) {
    //   newChecked.push(task);
    //   console.log('check')
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }
    // setChecked(newChecked);
  };

  const filteredTasksList = getFilteredTasks(filter, tasksList); // сохраняет отфильтрованные значения, не изменяя tasksList
  function handleFilter(filterButton) {
    // filterButton = 'all' | 'active' | 'completed'

    setFilter(filterButton);
  }
  console.log(filteredTasksList);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasksList));
  }, [tasksList]);

  return (
    <>
      <TextField
        type="text"
        variant="standard"
        value={newTask}
        onChange={handleChange}
        placeholder={newTask ? " " : "please add a task"}
      />
      {/* <input type="text" value={newTask} onChange={handleChange}/> */}
      <Button variant="outlined" onClick={addTask} color="secondary">
        add
      </Button>
      {/* <button onClick={addTask}>add</button> */}
      {/* <ol>
        {tasksList.map((task) =>  <li><div className="card">{task}</div></li>)}
      </ol>  */}
      <br></br>
      <br></br>
      <TaskFilter
        filterAll={() => handleFilter("all")}
        filterActive={() => handleFilter("active")}
        filterCompleted={() => handleFilter("completed")}
      />
      <br></br>

      {filteredTasksList.length > 0 ? (
        <List dense component="div" role="list">
          {filteredTasksList.map((task) => (
            // <ListItem id={task.id} text={task.text} done={task.done} />
            <ListItem
              task={task}
              handleToggle={handleToggle}
              removeTask={removeTask}
              checked={checked}
            /> // { task: { id: string, text: string; done: boolean; } }
          ))}
        </List>
      ) : (
        <Typography variant="h5">no tasks yet</Typography>
      )}
    </>
  );
}
