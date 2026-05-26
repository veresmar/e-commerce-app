import { useState, useEffect } from "react";
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


function getFilteredTasks(filter: 'all' | 'active' | 'completed', tasksList: Task[]) {
  
  if (filter == 'completed') {
    return tasksList.filter((task) => task.done == true)
  } else if (filter == 'active') {
     return tasksList.filter((task) => task.done == false)
  } else {
    return tasksList
  }
}

type Task = {
  id: number, // new date - генерим id, ИЛИ uuid (библиотека)
  text: string,
  done: boolean
}

export default function ToDo() {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [checked, setChecked] = useState([0]);
  const [filter, setFilter] = useState('all')

  function addTask(task: Inputs) {
    if (task.title.length > 0) { 
      const newTaskObj: Task = {id: new Date(), text: task.title, done: false};
      setTasksList([...tasksList, newTaskObj])
    } 
    // setNewTask(e.target.value)
  }
  
  function removeTask(taskToRemove: Task) {
    setTasksList([...tasksList].filter((task) => taskToRemove.id != task.id))
  }

  const handleToggle = (task: Task) => () => {
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
  function handleFilter(filterButton) { // filterButton = 'all' | 'active' | 'completed'
   
    setFilter(filterButton)
  }
  console.log(filteredTasksList)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasksList));
  }, [tasksList]);


  return (
    <>
      <ToDoForm onAddTask={addTask}/>

      <Divider />

      <br></br>
      <br></br>
      <TaskFilter filterAll={() => handleFilter('all')} filterActive={() => handleFilter('active')} filterCompleted={() => handleFilter('completed')}/>
      <br></br>

      {filteredTasksList.length > 0 ?
      <List dense component="div" role="list">
         {filteredTasksList.map((task) => {
          const labelId = `transfer-list-item-${task}-label`;

          return (
            <ListItemButton
              key={task.id}
              role="listitem"
              onClick={() => handleToggle(task)} // - нажатие на всю поверхность задачи
              sx={{
                backgroundColor: "#ffccff",
                "&:hover": {
                  backgroundColor: "#ffb3ff",
                  textDecoration: 'line-through'
                }
              }}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(task)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item: ${task.text}`} />
    
              <Button onClick={() => removeTask(task)} color="secondary" >
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Button>

            </ListItemButton>
          );
        })}
      </List>
        : <Typography variant="h5">no tasks yet</Typography>}
    </>
  )
}