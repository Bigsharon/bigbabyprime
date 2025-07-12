import { useEffect, useState } from "react";

function MovieModal({ movie, onClose }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=a1a93ad8&i=${movie.imdbID}&plot=full`
        );
        const data = await res.json();
        if (data.Response === "True") {
          setMovieDetails(data);
        } else {
          setMovieDetails(null);
          setError("Failed to load movie details.");
        }
      } catch (error) {
        setMovieDetails(null);
        setError("Error fetching movie details.");
      }
    };

    const fetchTrailer = async () => {
      try {
        const query = `${movie.Title} ${movie.Year} official trailer`;
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=YOUR_YOUTUBE_API_KEY`
        );
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          const videoId = data.items[0].id.videoId;
          setTrailerUrl(`https://www.youtube.com/embed/${videoId}`);
        } else {
          setTrailerUrl(null);
        }
      } catch (error) {
        setTrailerUrl(null);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([fetchMovieDetails(), fetchTrailer()]);
      setLoading(false);
    };

    fetchData();
  }, [movie.imdbID, movie.Title, movie.Year]);

  return (
    <div className="fixed inset-0 bg-pink-900 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-lg p-6 relative max-h-[90vh] overflow-y-auto border border-purple-300">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-pink-600 hover:text-pink-800 text-xl"
        >
          ×
        </button>
        {loading ? (
          <p className="text-center text-pink-600">Loading details...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : movieDetails ? (
          <>
            <h2 className="text-2xl font-bold mb-2 text-gray-700">{movieDetails.Title}</h2>
            {trailerUrl ? (
              <iframe
                className="w-full h-64 rounded mb-4"
                src={trailerUrl}
                title={`${movieDetails.Title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <img
                src={movieDetails.Poster !== "N/A" ? movieDetails.Poster : "/placeholder.jpg"}
                alt={movieDetails.Title}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}
            <p><strong className="text-pink-600">Year:</strong> {movieDetails.Year}</p>
            <p><strong className="text-pink-600">Type:</strong> {movieDetails.Type}</p>
            <p><strong className="text-pink-600">Genre:</strong> {movieDetails.Genre}</p>
            <p><strong className="text-pink-600">Runtime:</strong> {movieDetails.Runtime}</p>
            <p><strong className="text-pink-600">Director:</strong> {movieDetails.Director}</p>
            <p><strong className="text-pink-600">Actors:</strong> {movieDetails.Actors}</p>
            <p><strong className="text-pink-600">Plot:</strong> {movieDetails.Plot}</p>
            <p><strong className="text-pink-600">IMDb Rating:</strong> {movieDetails.imdbRating}/10</p>
            <p><strong className="text-pink-600">IMDb ID:</strong> {movieDetails.imdbID}</p>
          </>
        ) : (
          <p className="text-center text-red-400">Failed to load movie details.</p>
        )}
      </div>
    </div>
  );
}

export default MovieModal;