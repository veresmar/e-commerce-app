import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskFilter from "./Filter";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Typography } from "@mui/material";
import ToDoForm from "./ToDoForm";
import { type Inputs } from "./ToDoForm";



type Filter =  "all" | "active" | "completed";
function getFilteredTasks(
  filter: Filter, // filter — variable name,  Filter — variable type
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

type Task = {
  id: number, // new date - генерим id, ИЛИ uuid (библиотека)
  text: string,
  done: boolean
}

export default function ToDo() {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");

  function addTask(task: Inputs) {
    if (task.title.length > 0) { 
      const newTaskObj: Task = {id: new Date(), text: task.title, done: false};
      setTasksList([...tasksList, newTaskObj])
    } 
    // setNewTask(e.target.value)
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
  function handleFilter(filter: Filter) {
    // filterButton = 'all' | 'active' | 'completed'
    setFilter(filter); // passes the value into useState
  }
  console.log(filteredTasksList);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasksList));
  }, [tasksList]);

  return (
    <>
      <Typography variant="h4" sx={{ mb: 1 }}>ToDo App</Typography>
      <ToDoForm onAddTask={addTask}/>

      <Divider />
     
        <Stack
          direction="column"
          component="main"
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            width: '50%',
            margin: '0 auto',
          }}
        >

          <Stack component="section" direction="row">
            <TextField
              type="text"
              variant="standard"
              value={newTaskTitle}
              onChange={handleChange}
              placeholder={newTaskTitle ? " " : "please add a task"}
            />
            {/* <input type="text" value={newTaskTitle} onChange={handleChange}/> */}
            <Button sx={{ mb: 4 }} variant="outlined" onClick={addTask} color="secondary">
              add
            </Button>
          </Stack>

          <Stack component="section">
            <TaskFilter
              filterAll={() => handleFilter("all")}
              filterActive={() => handleFilter("active")}
              filterCompleted={() => handleFilter("completed")}
            />
          </Stack>
          <Stack component="section">
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
              <Typography variant="body1">no tasks yet</Typography>
            )}
          </Stack>
        </Stack>
      {/* <button onClick={addTask}>add</button> */}
      {/* <ol>
        {tasksList.map((task) =>  <li><div className="card">{task}</div></li>)}
      </ol>  */}
    </>
  );
}
