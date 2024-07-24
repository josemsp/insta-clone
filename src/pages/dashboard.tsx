import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import Timeline from "@/components/timeline"
import { useEffect } from "react"

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Insta Clone'
  }, [])

  return (
    <div className="bg-gray-50">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-9 md:justify-between max-w-screen-lg mx-auto px-5">
        <Timeline className="col-span-3 md:col-span-2 mx-auto" />
        <Sidebar className="hidden md:flex" />
      </div>
    </div>
  )
}

export default Dashboard