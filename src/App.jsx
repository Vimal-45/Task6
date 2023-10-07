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

const fetchData = async () => {
  try {
    const response = await fetch("https://mocki.io/v1/4ef417eb-75d4-4e0a-ad2e-cb3683ef0cad");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const initialState = await fetchData();

const App = () => { 

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
          <Route path="/home" element={<Home />} /> {/* Define a route for "/home" */}
        </Routes>

      </NoteContext.Provider>


    </div>
  );
};

export const NoteContext = createContext()
export default App;