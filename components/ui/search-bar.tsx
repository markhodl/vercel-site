import { Search } from "lucide-react"

export function SearchBar() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex shadow-lg rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search for businesses..."
          className="flex-1 px-6 py-4 border-0 focus:outline-none"
        />
        <button className="bg-yellow-500 px-6 py-4 text-white hover:bg-yellow-600">
          <Search className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
