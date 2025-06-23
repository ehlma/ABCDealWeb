import { useState } from 'react'
import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminContacts from './pages/admin/AdminContacts';
import Login from './pages/Login';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminLayout from './pages/admin/AdminLayout';
import AdminSettings from './pages/admin/AdminSettings';
import AdminArticles from './pages/admin/AdminArticles';
import ResetPasword from './pages/ResetPassword';
import EditArticle from './pages/admin/EditArticle';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Admin-beskyttede ruter */}
            <Route path='/' element={<Login />} />
            <Route path='/reset-password/:token' element={<ResetPasword />} />

            {/* nestede ruter under AdminLayout */}
            {/* '/admin' er forelder-ruten for alle admin-sidene */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}> {/* Tillat kun brukere med 'admin' rolle */}
            <Route path='/admin' element={<AdminLayout />}>
              {/* Disse rutene er relative til foreldreruten '/admin' */}
              <Route path='contacts' element={<AdminContacts />} />
              <Route path='complaints' element={<AdminComplaints />} />
              <Route path='settings' element={<AdminSettings />} />
              <Route path='articles' element={<AdminArticles />} />
              <Route path="articles/edit/:id" element={<EditArticle />} />
            </Route>
          </Route>

          {/* Offentlige ruter */}

          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
