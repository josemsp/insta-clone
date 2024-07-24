import User from "./user"
import Suggestions from "./suggestions"
import useUser from "@/hooks/use-user"

const Sidebar = ({ className }: { className?: string }) => {
  const { userData } = useUser()

  return (
    <div className={`${className} flex-col gap-5`}>
      <User fullName={userData?.fullName} username={userData?.username} />
      <Suggestions userId={userData?.userId} following={userData?.following} />
    </div>
  )
}

export default Sidebar