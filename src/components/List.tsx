import { useState } from "react";
import List from '@mui/material/List';
import ListItem from "./ListItem";



export default function List(props: string[]) {
  const [tasksList, setTasksList] = useState<string[]>([]);

  return (
    <>
       <List dense component="div" role="list">
          {tasksList.map((task: string) => {
            const labelId = `transfer-list-item-${task}-label`;
            return (
              <ListItem id={0} text={task} labelId={labelId}/>
            )
          })}
      </List>
    </>
    )
  }