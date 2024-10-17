import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PatientDetails from './pages/PatientDetails';
import {Toaster} from 'react-hot-toast'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/patient/:id' element={<PatientDetails/>}/>

      </Routes>
      <Toaster/>
    </>
  );
}

export default App
