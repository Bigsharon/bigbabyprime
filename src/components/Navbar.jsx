import { Search } from "lucide-react";
import { useState } from "react";

function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <nav
      className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-purple-500 via-pink-500 to-pink-300
 px-6 py-4 text-white shadow-md gap-4 md:gap-0"
    >
      <div>
        <h1 className="text-2xl font-bold">
          <span className=" text-pink-600">🎬 BigBaby</span>
          Prime
        </h1>
      </div>

      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white rounded-full px-4 py-1 w-full max-w-md border border-purple-300"
      >
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent text-gray-700 px-3 py-2 w-full focus:outline-none "
        />
        <button type="submit" className="text-pink-600 hover:text-pink-800">
          <Search className="w-5 h-5" />
        </button>
      </form>
    </nav>
  );
}

export default Navbar;
