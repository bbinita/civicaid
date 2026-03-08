import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-9xl font-black text-blue-100">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 -mt-4">Page not found</h2>
      <p className="text-gray-500 mt-2 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound