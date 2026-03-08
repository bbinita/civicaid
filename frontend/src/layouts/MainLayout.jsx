import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


const Mainlayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10 ">
        <Outlet />
      </main>
    </div>
  )
}

export default Mainlayout
