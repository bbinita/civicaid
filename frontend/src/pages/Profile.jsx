import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { getMyIssues } from '../services/issues'
import IssueCard from '../components/IssueCard'

export default function Profile() {
  const { user } = useAuth()

  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    async function fetchIssues() {
      try {
        const data = await getMyIssues()
        setIssues(data)
      } catch (err) {
        console.error('Error fetching issues:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchIssues()
  }, [])

  // stats
  const total = issues.length
  const resolved = issues.filter((i) => i.status === 'resolved').length
  const pending = issues.filter((i) => i.status === 'pending').length

  // filter logic
  const filteredIssues = filter
    ? issues.filter((i) => i.status === filter)
    : issues

  if (loading) {
    return <div className="p-6">Loading profile...</div>
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Profile Info */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-2xl font-semibold">{user?.name || 'User'}</h2>
        <p className="text-gray-600">{user?.email}</p>
        <p className="text-sm text-gray-400 mt-1">Citizen</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-lg font-bold">{total}</p>
          <p className="text-sm text-gray-500">Total</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-lg font-bold">{resolved}</p>
          <p className="text-sm text-gray-500">Resolved</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-lg font-bold">{pending}</p>
          <p className="text-sm text-gray-500">Pending</p>
        </div>
      </div>

      {/* My Issues */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold">My Issues</h3>
          <select
            className="border rounded-lg px-2 py-1 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {filteredIssues.length === 0 ? (
          <p className="text-gray-500">No issues found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
