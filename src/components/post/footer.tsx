import { formatDistance } from "date-fns"

const Footer = ({ username, caption, dateCreated }: { username: string, caption: string, dateCreated: Date }) => {
  return (
    <div className='px-4 pb-0 flex flex-col'>
      <span className='mr-1 font-bold'>{username}</span>
      <span className="italic">{caption}</span>
      <span className="text-xs text-gray-500">{formatDistance(dateCreated, new Date())}</span>
    </div>
  )
}

export default Footer