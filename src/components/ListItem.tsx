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
        borderRadius: 0,
        backgroundColor: "#2b2f4a",
        border: "3px solid #0d0e18",
        boxShadow: "4px 4px 0 0 #0d0e18",
        color: "#f4f4f0",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        marginBottom: "12px",
        textDecoration: props.task.done ? "line-through" : "none",
        textDecorationColor: "#38b764",
        textDecorationThickness: "0.2em",
        transition: "transform 80ms steps(2), box-shadow 80ms steps(2)",
        "&:hover": {
          backgroundColor: "#3a3f63",
          boxShadow: "6px 6px 0 0 #0d0e18",
          transform: "translate(-2px, -2px)",
          textDecorationColor: "#38b764",
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
