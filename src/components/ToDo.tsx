import { useState, useEffect } from "react";
import dayjs from "dayjs";
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
import { tasksApi, uploadImage, type ApiTask } from "../api/tasks";

export type Filter = "all" | "active" | "completed";
function getFilteredTasks(
  filter: Filter, // filter — variable name,  Filter — variable type
  tasksList: Task[],
) {
  if (filter == "completed") {
    return tasksList.filter((task) => task.done);
  } else if (filter == "active") {
    return tasksList.filter((task) => !task.done);
  } else {
    return tasksList;
  }
}

export type Task = Omit<ApiTask, "date"> & { date: Inputs["date"] };
const toTask = (task: ApiTask): Task => ({ ...task, date: dayjs(task.date) });

export default function ToDo() {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("active");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    tasksApi.list().then((tasks) => setTasksList(tasks.map(toTask))).catch((requestError: unknown) => setError(requestError instanceof Error ? requestError.message : "Unable to load tasks."));
  }, []);

  async function addTask(task: Inputs) {
    try {
      setError(null);
      const imageUrl = task.image ? await uploadImage(task.image) : null;
      const created = await tasksApi.create({ ...task, date: task.date.format("YYYY-MM-DD"), imageUrl, done: false });
      setTasksList((current) => [...current, toTask(created)]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to create task.");
      throw requestError;
    }
  }

  async function removeTask(taskToRemove: Task) {
    try {
      setError(null);
      await tasksApi.remove(taskToRemove.id);
      setTasksList((current) => current.filter((task) => taskToRemove.id !== task.id));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to delete task.");
    }
  }

  const filteredTasksList = getFilteredTasks(filter, tasksList); // сохраняет отфильтрованные значения, не изменяя tasksList
  function handleFilter(filter: Filter) {
    setFilter(filter); // passes the value into useState
  }

  async function handleCheck(task: Task) {
    const done = !task.done;
    try {
      setError(null);
      const updated = await tasksApi.update({ ...task, date: task.date.format("YYYY-MM-DD"), done });
      setTasksList((current) => current.map((item) => item.id === task.id ? toTask(updated) : item));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to update task.");
    }
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 1 }}>
        GET STUFF DONE
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            padding: "2em",
            paddingTop: "1em",
            paddingBottom: "1.5em",
            borderRadius: 0,
            
            "@media (max-width:650px)": {
              padding: "1.5em",
              paddingTop: "0.35em",
              paddingBottom: "0em",
              margin: ".4em",
              width: "100%",
            },
          },
          "& .MuiDialogContent-root": {
            padding: '0',
          },
          "& .MuiPaper-root": { // Dialog ToDo form (modal window)
            maxHeight: "calc(100% - 24px)",
            width: '35em',
          },
          "& .MuiDialog-container": {
            backgroundColor: "rgba(13, 14, 24, 0.6)",
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
      {error && <Typography color="error" role="alert">{error}</Typography>}

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
                  checked={tasksList.filter((task) => task.done).map((task) => task.id)}
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
