import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
import Register from './pages/Register'
// import axios from 'axios'

const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-right" />


      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>


        <Route path='*' element={<NotFound />}/>
      </Routes>
    </AuthProvider>
  )
}

export default App

