import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminContacts from './pages/AdminContacts';
import Login from './pages/Login';
import AdminComplaints from './pages/AdminComplaints';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin/contacts' element={<AdminContacts/>}/>
          <Route path='/admin/complaints' element={<AdminComplaints/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
