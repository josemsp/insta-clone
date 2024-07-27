import Suggestions from "./suggestions"
import User from "./user"
import { useUserStore } from "@/hooks/use-user-store"

const SuggestionsSidebar = () => {
  const { user } = useUserStore()

  return (
    <div className="hidden md:grid grid-cols-[minmax(160px,240px)] grid-rows-[73px,1fr] gap-5 ">
      <User photoUrl={user?.photoUrl} fullName={user?.fullName} username={user?.username} />
      <Suggestions userId={user?.userId} following={user?.following} />
    </div>
  )
}

export default SuggestionsSidebar