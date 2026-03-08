import useAuth from '../hooks/useAuth'

const Home = () => {
  const { user, logout  } = useAuth()
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}</h1>
      <p className='text-gray-500 mt-2'>You are logged in as {' '},
        <span> {user?.role}</span></p>
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