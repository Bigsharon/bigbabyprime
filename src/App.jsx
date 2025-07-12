import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MovieResults from "./components/MovieResults";
import WatchlistPanel from "./components/WatchlistPanel";
import MovieModal from "./components/MovieModal";
import Footer from "./components/Footer";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [filters, setFilters] = useState({ year: "", type: "" });
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const fetchDefaultMovies = async () => {
    setLoading(true);
    const searchTerms = [
      "action", "comedy", "drama", "sci-fi", "horror", "adventure",
      "romance", "thriller", "fantasy", "mystery", "crime", "animation"
    ];
    const randomTerms = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * searchTerms.length);
      randomTerms.push(searchTerms[randomIndex]);
    }
    let allResults = [];

    try {
      for (const term of randomTerms) {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=a1a93ad8&s=${term}`
        );
        const data = await res.json();
        if (data.Response === "True") {
          allResults = allResults.concat(data.Search);
        }
      }
      setMovies(allResults);
    } catch (error) {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=a1a93ad8&s=${query}`
      );
      const data = await res.json();
      setMovies(data.Response === "True" ? data.Search : []);
    } catch (err) {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = (movie) => {
    if (!watchlist.some((m) => m.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((m) => m.imdbID !== id));
  };

  const filteredMovies = movies.filter((movie) => {
    return (
      (!filters.year || movie.Year === filters.year) &&
      (!filters.type || movie.Type === filters.type)
    );
  });

  useEffect(() => {
    fetchDefaultMovies();
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      <Navbar onSearch={handleSearch} />
      <div className="flex justify-center gap-4 p-4">
        <select
          className="p-2 border border-pink-300 rounded bg-purple-100 text-gray-700 focus:ring-pink-500"
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
        >
          <option value="">All Years</option>
          {[...new Set(movies.map((m) => m.Year))].map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>

        <select
          className="p-2 border border-pink-300 rounded bg-purple-100 text-gray-700 focus:ring-pink-500"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All Types</option>
          {[...new Set(movies.map((m) => m.Type))].map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center text-xl mt-8 text-pink-600">Loading...</p>
      ) : (
        <MovieResults
          movies={filteredMovies}
          addToWatchlist={addToWatchlist}
          onSelectMovie={setSelectedMovie}
        />
      )}

      <button
        onClick={() => setShowWatchlist(!showWatchlist)}
        className="fixed bottom-6 right-6 bg-pink-500 text-white rounded-full p-4 shadow-xl hover:bg-pink-600"
      >
        📽️
      </button>

      {showWatchlist && (
        <WatchlistPanel
          watchlist={watchlist}
          onClose={() => setShowWatchlist(false)}
          removeFromWatchlist={removeFromWatchlist}
        />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}

      <Footer />
    </div>
  );
}

export default App;