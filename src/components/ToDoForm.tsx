import { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Select from '@mui/material/Select';
import DropZone from "./DropZone";

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
  const [priorityChoise, setPriorityChoise] = useState('Medium');
  function handleChangePriorityChoise () {
    const newChoise = event.target.value;
    setPriorityChoise(newChoise)
    console.log(newChoise)
  }
  function fileSelect() {
    
  }
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
  } = useForm<Inputs>({
      defaultValues: {
        title: "",
        description: "",
        priority: "medium",
        category: "personal",
        date: undefined,
        image: " "
      }
    });
 
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    props.onAddTask(data);
    console.log('1 onSubmit:', data)
    reset();
  }
  const watchImage = watch("image");
  const categories  = [
  'work',
  'personal',
  'home'
];
  

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

        {/* <Controller
          name="image"
          control={control}
          render={({ field }) => (  
            <ImageUploader 
              onChange={field.onChange}
            />
          )}
        /> */}
        {/* // DropZone заполнит поле формы "image" с помощью пропса onFileSelect*/}
        <Controller
          name="image"
          control={control}
          render={({ field }) => (  
            <DropZone 
              onFileSelect={field.onChange}
              initialImage={watchImage}
            />
          )}
        />
       
        <Button variant="outlined" type='submit' color="secondary">add</Button> 
      </Box>
      
    </LocalizationProvider>
  )
}
