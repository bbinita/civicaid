import useAuth from '../hooks/useAuth'

const Admin = () => {
  const { user } = useAuth()
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Logged in as {user?.name} — role: {user?.role}</p>
    </div>
  )
}

export default Admin