import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import  { type Filter } from './ToDo';
 
type TaskFilterProps = {
  onTaskFilterChange: (filter: Filter) => void,
  filter: Filter
}


export default function TaskFilter({onTaskFilterChange, filter}: TaskFilterProps ) {

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
          <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
  )}
    
