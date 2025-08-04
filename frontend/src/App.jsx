import { useState } from 'react'
import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Admin sider
import AdminContacts from './pages/admin/AdminContacts';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminLayout from './pages/admin/AdminLayout';
import AdminSettings from './pages/admin/AdminSettings';
import AdminArticles from './pages/admin/AdminArticles';
import EditArticle from './pages/admin/EditArticle';

// Autentisering sider
import Login from './pages/auth/Login';
import ResetPasword from './pages/auth/ResetPassword';

// Klient sider
import ClientLayout from './pages/client/ClientLayout';
import HomePage from './pages/client/HomePage';
import AboutPage from './pages/client/AboutPage';
import SalesProcessPage from './pages/client/SalesProcessPage';
import ComplaintsPage from './pages/client/ComplaintsPage';
import ContactPage from './pages/client/ContactPage';

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'
import ArticlePage from './pages/client/ArticlePage';
// import NotFoundPage from './pages/NotFoundPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <AuthProvider>
        
        <Router>
          <ScrollToTop/>
          <Routes>
            {/* Offentlige ruter */}
            <Route path='/' element={<ClientLayout/>}>
              <Route index element={<HomePage/>}/>
              <Route path='about' element={<AboutPage/>}/>
              <Route path='sales-process' element={<SalesProcessPage/>}/>
              <Route path='complaints' element={<ComplaintsPage/>}/>
              <Route path='contact' element={<ContactPage/>}/>
              <Route path='/articles/:id' element={<ArticlePage/>}/>
            </Route>

            {/* Autentiserings-ruter uten felles layout */}
            <Route path='/login' element={<Login />} />
            <Route path='/reset-password/:token' element={<ResetPasword />} />

            {/* nestede ruter under AdminLayout */}
            {/* '/admin' er forelder-ruten for alle admin-sidene */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}> 
            <Route path='/admin' element={<AdminLayout />}>
              {/* Disse rutene er relative til foreldreruten '/admin' */}
              <Route path='contacts' element={<AdminContacts />} />
              <Route path='complaints' element={<AdminComplaints />} />
              <Route path='settings' element={<AdminSettings />} />
              <Route path='articles' element={<AdminArticles />} />
              <Route path="articles/edit/:id" element={<EditArticle />} />
            </Route>
          </Route>

          {/* Fang alle udefinerte ruter (404) */}          
          {/* <Route path='*' element={<NotFoundPage/>}/> */}

          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
