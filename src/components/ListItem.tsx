import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Button, Tooltip, IconButton } from "@mui/material";

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
          backgroundColor: "#ffccff",
          "&:hover": {
            backgroundColor: "#ffb3ff",
            textDecoration: "line-through",
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
        <ListItemText id={labelId} primary={`List item: ${props.task.text}`} />

        <Button onClick={() => props.removeTask(props.task)} color="secondary">
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Button>
      </ListItemButton>
    
  );
}
