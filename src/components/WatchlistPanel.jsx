function WatchlistPanel({ watchlist, onClose, removeFromWatchlist }) {
  return (
    <div className="fixed bottom-24 right-6 bg-white border border-purple-300 rounded-lg shadow-xl p-4 w-[300px] max-h-[70vh] overflow-y-auto z-50">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-pink-600">🎬 Your Watchlist</h2>
        <button
          onClick={onClose}
          className="text-pink-600 hover:text-pink-800 font-bold text-xl"
        >
          ×
        </button>
      </div>

      {watchlist.length === 0 ? (
        <p className="text-pink-600 text-sm">No movies added yet.</p>
      ) : (
        <ul className="space-y-3">
          {watchlist.map((movie) => (
            <li key={movie.imdbID} className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-700">{movie.Title}</p>
                <p className="text-sm text-purple-600">({movie.Year})</p>
              </div>
              <button
                onClick={() => removeFromWatchlist(movie.imdbID)}
                className="text-purple-500 text-xs hover:text-purple-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WatchlistPanel;
