import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PatientDetails from './pages/PatientDetails';

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/patient/:id' element={<PatientDetails/>}/>

      </Routes>
    </>
  );
}

export default App
