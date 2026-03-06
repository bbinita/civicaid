import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
// import axios from 'axios'

const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
        <Route path='/' element={<Home />}/>
        <Route path="/admin" element={<Admin />} />
        </Route>

        <Route path='8' element={<NotFound />}/>
      </Routes>
    </AuthProvider>
  )
}

export default App