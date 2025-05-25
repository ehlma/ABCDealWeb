import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminContacts from './pages/AdminContacts';
import Login from './pages/Login';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin/contacts' element={<AdminContacts/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
