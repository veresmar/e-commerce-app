import { useState } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';


type ListItem = {
  id: number, // new date - генерим id, ИЛИ uuid (библиотека)
  text: string,
  // done: boolean
  labelId: string
}
export default function ListItem({id, text, labelId}: ListItem) {
  return (
    <>
      <ListItemButton 
        key={id} 
        role="listitem"
        // onClick={handleToggle(task)} // - нажатие на всю поверхность задачи
      >
        <ListItemIcon>
          <Checkbox
            // checked={checked.includes(value)}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={`List item: ${text}`} />
      </ListItemButton>
    </>
  )
}