import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PatientDetails from './pages/PatientDetails';
import {Toaster} from 'react-hot-toast'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useAuthContext } from './context/AuthContext';

function App() {
  const {authUser} = useAuthContext()
  return (
    <>
      <Routes>
        <Route
          path="/dashboard"
          element={authUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/patient/:id"
          element={authUser ? <PatientDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/dashboard" /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App
