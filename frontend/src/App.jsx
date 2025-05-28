import { useState } from 'react'
import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminContacts from './pages/AdminContacts';
import Login from './pages/Login';
import AdminComplaints from './pages/AdminComplaints';
import AdminLayout from './pages/AdminLayout';
import AdminSettings from './pages/AdminSettings';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>

          {/* nestede ruter under AdminLayout */}
          <Route path='/admin' element={<AdminLayout/>}>
            <Route path='/admin/contacts' element={<AdminContacts/>}/>
            <Route path='/admin/complaints' element={<AdminComplaints/>}/>
            <Route path='/admin/settings' element={<AdminSettings/>}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
