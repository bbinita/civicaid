import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'

const App = () => {
  useEffect(() => {
    axios.post('http://localhost:8000/api/auth/login', {
      email: 'test@test.com',
      password: 'password'
    })
    .then(res => console.log('Success:', res.data))
    .catch(err => console.error('Error:', err))
  }, [])

  return (
    <div>
      <Toaster position="top-right" />
    </div>
  )
}

export default App