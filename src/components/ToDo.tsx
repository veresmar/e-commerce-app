import { useState, useEffect } from "react";
// import Controller from "react-hook-form";
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { v4 as uuidv4 } from "uuid";
import TaskFilter from "./Filter";
import List from '@mui/material/List';
import ListItem from "./ListItem";
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack'
import { Typography } from "@mui/material";
import ToDoForm from "./ToDoForm";
import { type Inputs } from "./ToDoForm";
import Button from "@mui/material/Button";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


export type Filter =  "all" | "active" | "completed";
function getFilteredTasks(
  filter: Filter, // filter — variable name,  Filter — variable type
  tasksList: Task[],
  checked: string[]
) {
  if (filter == "completed") {
    return tasksList.filter((task) => checked.includes(task.id));
  } else if (filter == "active") {
    return tasksList.filter((task) => !checked.includes(task.id));
  } else {
    return tasksList;
  }
}

type Task = Inputs & {
  id: string, // new date - генерим id, ИЛИ uuid (библиотека)
}

export default function ToDo() {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [filter, setFilter] = useState<Filter>('active');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function addTask(task: Inputs) {
    if (task.title.length > 0) { 
      const newTaskObj: Task = {id: uuidv4(), ...task}; // ...task - записали все поля Task
      setTasksList([...tasksList, newTaskObj])
    } 
  }
  
  function removeTask(taskToRemove: Task) {
    setTasksList([...tasksList].filter((task) => taskToRemove.id != task.id));
  }

  const filteredTasksList = getFilteredTasks(filter, tasksList, checked); // сохраняет отфильтрованные значения, не изменяя tasksList
  function handleFilter(filter: Filter) {
    setFilter(filter); // passes the value into useState
  }
  console.log(filteredTasksList);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasksList));
  }, [tasksList]);

  function handleCheck(task: Task) {
    checked.includes(task.id) ? setChecked(checked.filter((checkedTask) => task.id != checkedTask)) : setChecked([...checked, task.id])
    console.log(task.id)
  }
  return (
    <>

      <Typography variant="h4" sx={{ mb: 1 }}>ToDo App</Typography>
      <Dialog 
        open={open} 
        sx={{
          "& .MuiDialog-paper": {
            padding: '3em',
            borderRadius: '1.2em'
          
          },
        }}>
        <ToDoForm onAddTask={addTask} onClose={handleClose} />
      </Dialog>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>add new task</Button>
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

          
          <Stack component="section">
            <TaskFilter onTaskFilterChange={handleFilter} filter={filter}/>
          </Stack>
          {/* <Controller
          name="priority"
          control={control}
          render={({ field }) => (   // через перемен. field предоставл. допступ к полю priority
          
            <ToggleButtonGroup
              color="secondary"
              value={priorityChoise}
              exclusive
              onChange={handleChangePriorityChoise}
              aria-label="Tasks priority"
            >
              <ToggleButton value="Low">Low</ToggleButton>
              <ToggleButton value="Medium">Medium</ToggleButton>
              <ToggleButton value="High">High</ToggleButton>
            </ToggleButtonGroup>
            )}
        /> */}



          <Stack component="section">
           
            {filteredTasksList.length > 0 ? (
              
              <List dense component="div" role="list">
                {filteredTasksList.map((task) => (
                  <ListItem
                    key={task.id}
                    task={task}      
                    handleToggle={handleCheck}
                    removeTask={removeTask}
                    checked={checked}
                  />
                ))}
              </List>
            ) : (
              <Typography variant="body1">no tasks yet</Typography>
            )}
          </Stack>
        </Stack>
    </>
  );
}
