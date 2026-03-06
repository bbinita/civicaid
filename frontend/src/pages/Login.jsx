import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleFakeLogin = () => {
    login(
      { id: 1, name: 'Test User', email: 'test@test.com' },
      'fake-access-token-123',
      'fake-refresh-token-456'
    )
    navigate('/')
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <button
          onClick={handleFakeLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Fake Login (Test)
        </button>
      </div>
    </div>
  )
}

export default Login