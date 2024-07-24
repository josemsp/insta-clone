const Loading = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`grid justify-center items-center bg-slate-300/50 w-full h-full ${className}`}>
      <div className="border-8 border-gray-200 border-t-8 border-t-blue-500 rounded-full w-20 h-20 animate-spin"></div>
    </div>
  )
}

export default Loading