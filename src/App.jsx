import React, {useState, useEffect, createContext,  useReducer  } from 'react';
import Home from './Components/Home';
import Note from './Components/Note';
import Task from './Components/Task';
import Archive from './Components/Archive';
import Bin from './Components/Bin';
import Sidebar from './Components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReducerAction from './Features/ReducerAction';
import  data from './Data.json'

const App = () => { 

  const [initialState,setIntialState] = useState(data)
  
   useEffect(()=>{
      fetchData();
   },[])

   const fetchData = async () => {
    const response = await fetch(`https://mocki.io/v1/4ef417eb-75d4-4e0a-ad2e-cb3683ef0cad`).then()
    const data = await response.json();
    console.log(data)
    setIntialState(data); 

  };

  const [state, dispatch] = useReducer(ReducerAction, initialState );
 
  return (
    <div>
      <NoteContext.Provider value={{ state, dispatch }} >
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/note" element={<Note />} />
          <Route path="/task" element={<Task />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/bin" element={<Bin />} />
          <Route path="/home" element={<Home />} /> 
        </Routes>

      </NoteContext.Provider>


    </div>
  );
};

export const NoteContext = createContext()
export default App;