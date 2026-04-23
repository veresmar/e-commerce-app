import { useState } from 'react'
import { Typography } from "@mui/material";

// import './App.css'
import ToDo from './components/ToDo'

function App() {
  // const [todos, setTodos] = useState([]);
  return (
    <>
      <section id="center">
        <Typography variant="h3">ToDo App</Typography>
        <br />  
         <br />  
        <ToDo />      
      </section>

    </>
  )
}

export default App
