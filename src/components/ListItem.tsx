import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Tooltip, IconButton } from "@mui/material";
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

  return (
    <ListItemButton
      key={props.task.id}
      role="listitem"
      onClick={() => props.handleToggle(props.task)} // - нажатие на всю поверхность задачи
      sx={{
        borderRadius: ".4em",
        backgroundColor: "#ffccff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        marginBottom: ".2em",
        textDecoration: props.task.done ? "line-through" : "none",
        textDecorationColor: "#9c27b0",
        textDecorationThickness: "0.2em",
        "&:hover": {
          // backgroundColor: "#ffb3ff",
          backgroundColor: "#ffccff",
          textDecoration: "line-through",
          textDecorationColor: "#9c27b0",
          textDecorationThickness: "0.2em",
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
          flexDirection: "row",
          gap: 0.8,
        }}
        id={labelId}
        primary={`Task: ${props.task.title}`}
        secondary={
          <>
            {props.task.description}
            {`Date: ${props.task.date.format("DD.MM.YYYY")}`}
          </>
        }
      />
      {props.task.image ? (
        <img
          src={URL.createObjectURL(props.task.image)}
          alt={props.task.title}
          width={45}
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
