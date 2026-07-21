import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Select from "@mui/material/Select";
import DropZone from "../ui/DropZone";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

type PriorityStatus = "low" | "medium" | "high";
type Category = "work" | "personal" | "home";

export type Inputs = {
  title: string;
  description: string;
  priority: PriorityStatus;
  category: Category;
  date: Dayjs;
  image: File | null;
};

type ToDoFormProps = {
  onAddTask: (inputs: Inputs) => void;
  onClose: () => void;
};

export default function ToDoForm(props: ToDoFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      category: "personal",
      date: dayjs(),
      image: null,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    props.onAddTask(data);
    console.log("1 onSubmit:", data);
    reset();
    props.onClose();
  };

  const watchImage = watch("image");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          maxWidth: 400,
          gap: 2,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          type="text"
          variant="standard"
          label="Title"
          error={errors.title ? true : false}
          {...register("title", {
            required: "Title is required",
          })}
          helperText={errors.title?.message}
        />

        <TextField
          type="text"
          variant="standard"
          rows={3}
          multiline
          label="Description"
          fullWidth
          {...register("description")}
        />

        <Controller
          name="priority"
          control={control}
          render={(
            { field }, // через перемен. field предоставл. допступ к полю priority
          ) => (
            <FormControl>
              <FormLabel sx={{ typography: "caption", mb: 0.5 }}>
                Priority
              </FormLabel>
              <ToggleButtonGroup
                color="secondary"
                value={field.value}
                exclusive
                onChange={(_event, value) => {
                  field.onChange(value);
                }}
                aria-label="Tasks priority"
                fullWidth
                sx={{ marginBottom: '.1em'}}
              >
                <ToggleButton value="low">Low</ToggleButton>
                <ToggleButton value="medium">Medium</ToggleButton>
                <ToggleButton value="high">High</ToggleButton>
              </ToggleButtonGroup>
            </FormControl>
          )}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <FormControl>
              <FormLabel sx={{ typography: "caption", mb: 0.5 }}>
                Category
              </FormLabel>
              <Select value={field.value} onChange={field.onChange} fullWidth>
                <MenuItem value={"work"}>Work</MenuItem>
                <MenuItem value={"personal"}>Personal</MenuItem>
                <MenuItem value={"home"}>Home</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Deadline"
              value={field.value}
              onChange={field.onChange}
              slotProps={{
                textField: { variant: "standard", fullWidth: true },
              }}
            />
          )}
        />
        {/* // DropZone заполнит поле формы "image" с помощью пропса onFileSelect*/}
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <DropZone onFileSelect={field.onChange} initialImage={watchImage} />
          )}
        />
        <Button variant="outlined" type="submit" color="secondary" 
        sx={{width: "100%",
          "@media (max-width:650px)": {
            width: "100%",
            marginBottom: '1em'
          }}}>
          add
        </Button>
      </Box>
    </LocalizationProvider>
  );
}
