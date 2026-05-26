import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { PriorityHigh } from "@mui/icons-material";
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs'

import Select from '@mui/material/Select';

type PriorityStatus = 'low' | 'medium' | 'high';
type Category = 'work' | 'personal' | 'home';


export type Inputs = {
  title: string
  description: string
  priority: PriorityStatus
  category: Category
  date: Dayjs
  image: string
}

type ToDoFormProps = {
  onAddTask: (inputs: Inputs) => void;
};

export default function ToDoForm(props: ToDoFormProps) {
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
  const [priorityChoise, setPriorityChoise] = useState('Medium');
  function handleChangePriorityChoise () {
    const newChoise = event.target.value;
    setPriorityChoise(newChoise)
    console.log(newChoise)
  }
  const {
    register,
    control,
    handleSubmit,
  } = useForm<Inputs>()
  // как связать с useState [tasksList, setTasksList] ?
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    props.onAddTask(data);
  }
  

  
  // <form onSubmit={handleSubmit}>
  //   <TextField type='text' variant="standard" placeholder="ToDo title" onChange={handleTitle}/>
  //   <TextField type='text' variant="standard" placeholder="ToDo description" onChange={handleDescription}/>  
  //     <Button variant="outlined" type='submit' color="secondary">add</Button>
  // </form>   
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box 
        component='form'
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 400, gap: 2 }}
        onSubmit={handleSubmit(onSubmit)}
        >

        <TextField type='text' variant="standard" label="Title" {...register("title")} />
        <TextField type='text' variant="standard" rows={3} multiline  label="Description" {...register("description")}/>  
        
        <Controller
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
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (  
            <Select
              value={field.value}
              onChange={field.onChange}
            >
              <MenuItem value={'work'}>Work</MenuItem>
              <MenuItem value={'personal'}>Personal</MenuItem>
              <MenuItem value={'home'}>Home</MenuItem>
            </Select>
            )}
        />



        <Controller
          name="date"
          control={control}
          render={({ field }) => (  

            <DatePicker
              label="Controlled picker"
              value={field.value}
              onChange={field.onChange}
            /> 
            )}
        />
        {/* <DatePicker
          label="Controlled picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        /> */}

        <Button variant="outlined" type='submit' color="secondary">add</Button> 
      
      </Box>
    </LocalizationProvider>
  )
}


// placeholder="ToDo title"