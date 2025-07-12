function MovieResults({ movies, addToWatchlist, onSelectMovie }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {movies.length === 0 ? (
        <p className="text-center text-pink-600 col-span-full">
          No movies found.
        </p>
      ) : (
        movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition border border-pink-200"
            onClick={() => onSelectMovie(movie)}
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
              alt={movie.Title}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold text-pink-600">
              {movie.Title}
            </h3>
            <p className="text-sm text-pink-600">
              {movie.Year} • {movie.Type}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent modal opening when clicking button
                addToWatchlist(movie);
              }}
              className="mt-2 bg-gradient-to-r from-purple-500 via-pink-500 to-pink-300
 text-white px-3 py-1 rounded hover:bg-purple-600"
            >
              Add to Watchlist
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MovieResults;
