import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskFilter from "./Filter";
import List from "@mui/material/List";
import ListItem from "./ListItem";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { DialogContent, DialogTitle, Typography, Box } from "@mui/material";
import ToDoForm from "./ToDoForm";
import { type Inputs } from "./ToDoForm";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export type Filter = "all" | "active" | "completed";
function getFilteredTasks(
  filter: Filter, // filter — variable name,  Filter — variable type
  tasksList: Task[],
) {
  if (filter === "completed") {
    return tasksList.filter((task) => task.done);
  } 
  if (filter === "active") {
    return tasksList.filter((task) => !task.done);
  }
  return tasksList;
}

// export type Task = Inputs & {
//   id: string; // new date - генерим id, ИЛИ uuid (библиотека)
//   done: boolean;
// };

export type Task = Omit<Inputs, "date"> & {
  id: string;
  date: string;
  done: boolean;
};

export default function ToDo() {
  const [tasksList, setTasksList] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("todos");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];
  });
  // const [checked, setChecked] = useState<string[]>([]);
  const [filter, setFilter] = useState<Filter>("active");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function addTask(task: Inputs) {
    if (task.title.length > 0) {
      const newTaskObj: Task = { ...task, id: uuidv4(),  date: task.date.toISOString(), done: false  }; // ...task - записали все поля Task
      setTasksList((prev) => [...prev, newTaskObj]);
    }
  }

  function removeTask(taskToRemove: Task) {
    setTasksList([...tasksList].filter((task) => taskToRemove.id != task.id));
  }

  const filteredTasksList = getFilteredTasks(filter, tasksList); // сохраняет отфильтрованные значения, не изменяя tasksList
  function handleFilter(filter: Filter) {
    setFilter(filter); // passes the value into useState
  }

  useEffect(() => {
    localStorage.setItem(
      "todos",
      JSON.stringify(tasksList)
    );
  }, [tasksList]);

  function handleCheck(task: Task) {
    setTasksList((prevTasks) =>
      prevTasks.map((item) =>
        item.id === task.id
          ? { ...item, done: !item.done }
          : item
      )
    );
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 1 }}>
        ToDo App
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            padding: "1.8em",
            paddingTop: "0.2em",
            paddingBottom: "0.8em",
            borderRadius: "1.2em",
            
            "@media (max-width:650px)": {
              padding: "1.5em",
              margin: "1em",
              width: "100%",
            },
          },
          "& .MuiDialogContent-root": {
            padding: '0',
          },
          "& .MuiPaper-root": {
            maxHeight: "calc(100% - 24px)",
            "@media (max-width:650px)": {
              maxHeight: "calc(100% - 100px)",
            }
          },
          "& .MuiDialog-container": {
            backgroundColor: "#eaa6ea7d",
            opacity: "0.1"
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: '0.5em',
          }}
        >
          <DialogTitle 
            sx={(theme) => ({
              color: theme.palette.grey[500],
              padding: '0',
            })}> Add New Task
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({        
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent>
            <ToDoForm onAddTask={addTask} onClose={handleClose} />
        </DialogContent>
      </Dialog>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        add new task
      </Button>
      <Divider />

      <Stack
        direction="column"
        component="main"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          minWidth: "80%",
          width: "100%",
          margin: "0 auto",

          "@media (max-width:650px)": {
            minWidth: "100%",
          },
        }}
      >
        <Stack component="section">
          <TaskFilter onTaskFilterChange={handleFilter} filter={filter} />
        </Stack>

        <Stack component="section">
          {filteredTasksList.length > 0 ? (
            <List dense component="div" role="list">
              {filteredTasksList.map((task) => (
                <ListItem
                  key={task.id}
                  task={task}
                  handleToggle={handleCheck}
                  removeTask={removeTask}
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
