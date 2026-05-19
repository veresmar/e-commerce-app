import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// "я знаю только текст, который пользователь ввёл" = временный буфер ввода
type TaskInput = {
  onAddTask: (text: string) => void; // функция, передаваемая родителем в дочерний компонент через props|вызывается когда надо добавить задачу|TaskInput не знает что в этой функции|“передай текст наверх”
}
export default function TaskInput({onAddTask}: TaskInput) {
  const [newTask, setNewTask] = useState('');

  function handleAdd() {
    if (newTask.length === 0) return;
    onAddTask(newTask); 
    setNewTask("");
  }
  // ввод текста
   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(e.target.value)
  }

  return (
    <>
      <TextField
          type="text"
          variant="standard"
          value={newTask}
          onChange={handleChange}
          placeholder={newTask ? " " : "please add a task"}
        />
      
      <Button sx={{ mb: 4 }} variant="outlined" onClick={handleAdd} color="secondary">add</Button>
    </>
  )
}