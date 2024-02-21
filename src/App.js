import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import User from './User';

function App() {
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<User/>} />
      
    </Routes>
  </Router>
  );
}

export default App;
