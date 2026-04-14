import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';


export default function ToDo() {
  const [newTask, setNewTask] = useState('');
  const [tasksList, setTasksList] = useState<string[]>([]);
  function addTask() {
    setTasksList([...tasksList, newTask])
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(e.target.value)
  }
  return (
    <>
      <TextField variant="standard" value={newTask} onChange={handleChange}/>
      {/* <input type="text" value={newTask} onChange={handleChange}/> */}
      <Button variant="outlined" onClick={addTask}>add</Button>
      {/* <button onClick={addTask}>add</button> */}
      {/* <ol>
        {tasksList.map((task) =>  <li><div className="card">{task}</div></li>)}
      </ol>  */}

      <List dense component="div" role="list">
        {tasksList.map((task: string) => {
          const labelId = `transfer-list-item-${task}-label`;

          return (
            <ListItemButton
              key={task}
              role="listitem"
              // onClick={handleToggle(task)} // - нажатие на всю поверхность задачи
            >
              <ListItemIcon>
                <Checkbox
                  // checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${task}`} />
            </ListItemButton>
          );
        })}
      </List>
    </>
  )
}