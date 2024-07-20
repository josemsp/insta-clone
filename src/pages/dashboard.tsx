import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import Timeline from "@/components/timeline"
import { useAuth } from "@/hooks/useAuth"
import { useEffect } from "react"

const Dashboard = () => {
  const { user } = useAuth()

  useEffect(() => {
    document.title = 'Insta Clone'
  }, [])


  return (
    <div className="bg-gray-50">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between max-w-screen-lg mx-auto">
        {/* <h1>Dashboard</h1>
        <p>{user ? 'user: ' + user?.displayName : 'not logged'}</p> */}
        <Timeline />
        <Sidebar />
      </div>
    </div>
  )
}

export default Dashboard