import useAuth from '../hooks/useAuth'

const Home = () => {
  const { user, logout } = useAuth()
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Protected Home Page</h1>
      <p>Welcome, {user?.name || 'User'}</p>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  )
}

export default Home