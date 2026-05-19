import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
 
type TaskFilter = {
  filterAll: () => void,
  filterActive: () => void,
  filterCompleted: () => void
}

export default function TaskFilter({filterAll, filterActive, filterCompleted}: TaskFilter ) {
  return (
      <ButtonGroup variant="outlined" color="secondary" aria-label="Basic button group">
        <Button onClick={filterAll}> All</Button>
        <Button onClick={filterActive}> Active</Button>
        <Button onClick={filterCompleted}> Completed </Button>
      </ButtonGroup>
  )
}