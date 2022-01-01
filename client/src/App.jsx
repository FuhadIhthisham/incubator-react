import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'

import Login from './Pages/LoginPage'
import HomePage from './Pages/HomePage';
import AdminLoginPage from './Pages/AdminLoginPage'
import AdminPage from './Pages/AdminPage'
import SlotPage from './Pages/SlotPage'
import RecordTrackPage from './Pages/RecordTrackPage'

import './App.css';


function App() {

  const [datas, setDatas] = useState([]);

  const fetchData = async() =>{
    const { data } = await axios.post('/login')

    setDatas(data)
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/admin/login" element={ <AdminLoginPage /> } />
        <Route path="/admin" element={ <AdminPage /> } />
        <Route path="/admin/slots" element={ <SlotPage /> } />
        <Route path="/admin/records" element={ <RecordTrackPage /> } />
      </Routes>
    </Router>
  );
}

export default App;
