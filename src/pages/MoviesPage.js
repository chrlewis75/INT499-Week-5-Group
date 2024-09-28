import React, { useState, useEffect } from 'react'; // React hooks
import { fetchPopularMovies } from '../services/tmdbService'; // For importing currnet popular movies from TMDB API
import '../pages/MoviesPage.css'; // Popular Movies page styling

const MoviesPage = () => {
  const [movies, setMovies] = useState([]); // movies keeps list of popular movies and setMovies updates the state of movies

  useEffect(() => { 
    const fetchMovies = async () => { // fetchMovies calls fetchPopularMovies from TMDB API
      const popularMovies = await fetchPopularMovies();
      setMovies(popularMovies);
    };
    fetchMovies();
  }, []);

  // Used when the user selects a popular movie to add to their movie list
  // Saves to localStorage under permenantMovies key
  const handleAddToSavedMovies = (movie) => { 
    const savedMovies = JSON.parse(localStorage.getItem('permanentMovies')) || [];

    if (!savedMovies.some(savedMovie => savedMovie.id === movie.id)) {
      const updatedMovies = [...savedMovies, movie];
      localStorage.setItem('permanentMovies', JSON.stringify(updatedMovies));
      alert(`${movie.title} has been added to your saved movies!`);
    } else {
      alert('This movie is already in your saved movies.');
    }
  };

  // Returns the list of popular movies from the TMDB API
  return (
    <div className="MoviesPage-container">
      <h2>Popular Movies</h2>
      <ul className="movie-list">
        {movies.map(movie => (
          <li key={movie.id} className="movie-item">
            <span>{movie.title}</span>
            <button 
              className="save-button" 
              onClick={() => handleAddToSavedMovies(movie)}
            >
              Save to My Movie List
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;