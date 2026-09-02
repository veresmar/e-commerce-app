import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Tooltip, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
/** так импортируются типы, чтобы сборщик проекта игнорировал эту строчку во время сборки (билда) в один js файл */
import type { Task } from "./ToDo";

type ListItemProps = {
  task: Task;
  handleToggle: (task: Task) => void;
  removeTask: (task: Task) => void;
  checked: string[];
};

export default function ListItem(props: ListItemProps) {
  // ListItemProps.task.id - неправильно // props.task.id - правильно
  const labelId = `transfer-list-item-${props.task.id}-label`;
  const priorityIcons = {
    low: "🟢",
    medium: "🟡",
    high: "🔴",
  };
  return (
    <ListItemButton
      key={props.task.id}
      role="listitem"
      onClick={() => props.handleToggle(props.task)} // - нажатие на всю поверхность задачи
      sx={{
        maxWidth: '99%',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        marginBottom: ".6em",
        backgroundColor: "#2b2f4a",
        border: "3px solid #0d0e18",
        boxShadow: "2px 2px 0 0 #0d0e18",
        transition: "transform 80ms steps(2), box-shadow 80ms steps(2)",
        
        
        "&:hover": {
          // textDecoration: props.task.done ? "none" : "line-through",
          textDecorationThickness: "2em",
          textDecorationColor: "#7eb738ff",
          backgroundColor: "#495190ff",
          boxShadow: "6px 6px 0 0 #0d0e18",
          transform: "translate(-2px, -2px)",
          
        },
      }}
    >
      <ListItemIcon>
        <Checkbox
          checked={props.checked.includes(props.task.id)}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>

      <ListItemText
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.8,
          
        }}
        id={labelId}
        primary={
          <>
            {priorityIcons[props.task.priority]} Task: {props.task.title}
          </>
        }
        secondary={
          <Stack spacing={0.5}>
            <Typography variant="body2">
              {props.task.description}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Typography variant="caption">
                {props.task.date.format("DD.MM.YYYY")}
              </Typography>

              <Typography variant="caption">
                {props.task.category}
              </Typography>
            </Stack>
          </Stack>
        }
      />
      
      {props.task.imageUrl ? (
        <img
          src={props.task.imageUrl}
          alt={props.task.title}
          width={55}
        ></img>
      ) : null}

      <Tooltip title="Delete">
        <IconButton
          onClick={() => props.removeTask(props.task)}
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </ListItemButton>
  );
}
