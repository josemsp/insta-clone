import { useAuth } from "@/hooks"
import User from "./user"
import Suggestions from "./suggestions"

const Sidebar = () => {
  const { userData } = useAuth()
  console.log('userData', userData)

  return (
    <div>
      <User fullName={userData?.fullName} username={userData?.username} />
      <Suggestions userId={userData?.userId} following={userData?.following} />
    </div>
  )
}

export default Sidebar