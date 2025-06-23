import { useState } from 'react'
import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminContacts from './pages/admin/AdminContacts';
import Login from './pages/admin/Login';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminLayout from './pages/admin/AdminLayout';
import AdminSettings from './pages/admin/AdminSettings';
import AdminArticles from './pages/admin/AdminArticles';
import ResetPasword from './pages/admin/ResetPassword';
import EditArticle from './pages/admin/EditArticle';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/reset-password/:token' element={<ResetPasword/>}/>

          {/* nestede ruter under AdminLayout */}
          <Route path='/admin' element={<AdminLayout/>}>
            <Route path='/admin/contacts' element={<AdminContacts/>}/>
            <Route path='/admin/complaints' element={<AdminComplaints/>}/>
            <Route path='/admin/settings' element={<AdminSettings/>}/>
            <Route path='/admin/articles' element={<AdminArticles/>}/>
            <Route path="/admin/articles/edit/:id" element={<EditArticle />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
