import SuggestionsSidebar from "@/components/suggestions-sidebar"
import Timeline from "@/components/timeline"
import { useEffect } from "react"

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Insta Clone'
  }, [])

  return (
    <>
      <div className="w-full max-w-[470px]">
        <Timeline />
      </div>
      <SuggestionsSidebar />
    </>
  )
}

export default Dashboard