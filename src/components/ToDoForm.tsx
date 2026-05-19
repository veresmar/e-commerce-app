import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, type SubmitHandler } from "react-hook-form"

type Inputs = {
  title: string
  description: string
}


export default function ToDoForm() {
  // const [ title, setTitle ] = useState(' ');
  // const [ description, setDescription ] = useState(' ');

  // function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
  //     setTitle(e.target.value)
  //   }
  // function handleDescription(e: React.ChangeEvent<HTMLInputElement>) {
  //     setDescription(e.target.value)
  //   }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log(title, description);
  // }

  const {
    register,
    handleSubmit,
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
      // <form onSubmit={handleSubmit}>
      //   <TextField type='text' variant="standard" placeholder="ToDo title" onChange={handleTitle}/>
      //   <TextField type='text' variant="standard" placeholder="ToDo description" onChange={handleDescription}/>  
      //     <Button variant="outlined" type='submit' color="secondary">add</Button>
      // </form>   
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField type='text' variant="standard" placeholder="ToDo title" {...register("title")}/>
        <TextField type='text' variant="standard" placeholder="ToDo description" {...register("description")}/>  
        <Button variant="outlined" type='submit' color="secondary">add</Button> 
      </form>
  )
}