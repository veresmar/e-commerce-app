import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Badge from "@mui/material/Badge";
import { type Filter } from "./ToDo";

type TaskFilterProps = {
  onTaskFilterChange: (filter: Filter) => void;
  filter: Filter;
  completedCount: number;
};

export default function TaskFilter({
  onTaskFilterChange,
  filter,
  completedCount,
}: TaskFilterProps) {
  return (
    <ToggleButtonGroup
      color="secondary"
      value={filter}
      exclusive
      onChange={(_, value) => onTaskFilterChange(value)} // _ means event
      aria-label="Tasks filter"
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="active">Active</ToggleButton>
      <ToggleButton
        value="completed"
        sx={{ overflow: "visible", position: "relative" }}
      >
        Completed
        <Badge
          badgeContent={completedCount}
          invisible={completedCount === 0}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            transform: "translate(50%, -50%)",
            "& .MuiBadge-badge": {
              position: "static",
              transform: "none",
              backgroundColor: "#ec69beff",
              color: "#130d18ff",
              fontWeight: 700,
            },
          }}
        />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
