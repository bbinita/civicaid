import useAuth from '../hooks/useAuth'

const Staff = () => {
  const { user } = useAuth()
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Staff Dashboard</h1>
      <p className="text-gray-600 mt-2">Welcome, {user?.name} — role: {user?.role}</p>
    </div>
  )
}

export default Staff