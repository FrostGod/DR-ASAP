export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-xl">DR</span>
      </div>
      <div className="flex flex-col">
        <span className="text-blue-600 font-bold text-xl leading-none">ASAP</span>
        <span className="text-gray-500 text-xs">Medical Assistant</span>
      </div>
    </div>
  )
} 