import React, { useState, useEffect } from 'react';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]); // State to store movies
  const [editingID, setEditingID] = useState(null); // Track editing ID
  const [editInput, setEditInput] = useState(''); // Input for editing the movie title

  // Load the list from permanentMovies when the component mounts
  useEffect(() => {
    const savedMovies = localStorage.getItem('permanentMovies');
    if (savedMovies) {
      console.log('Loaded movies from permanentMovies:', JSON.parse(savedMovies));
      setMovies(JSON.parse(savedMovies));
    }
  }, []);

  // Save movies to localStorage only when the movies array changes
  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem('permanentMovies', JSON.stringify(movies));
    }
  }, [movies]);

  
  const handleDelete = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id); // Remove movie by id
    setMovies(updatedMovies); // Update movie list
  };

  const handleComplete = (id) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === id ? { ...movie, completed: !movie.completed } : movie // Toggle movie completion
    );
    setMovies(updatedMovies);
  };

  const handleEdit = (id, currentTitle) => {
    setEditingID(id); // Set id of movie to be edited
    setEditInput(currentTitle); // Set movie title in input
  };

  const handleEditSubmit = (id) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === id ? { ...movie, title: editInput } : movie // Update the movie title
    );
    setMovies(updatedMovies);
    setEditingID(null); // Reset editing state
    setEditInput(''); // Clear input field
  };

  return (
    <div className="movies-container">
      <h1>My Saved Movies To Watch</h1>
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className={`movie-item ${movie.completed ? 'completed' : ''}`}>
              {editingID === movie.id ? (
                <div>
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                  />
                  <button onClick={() => handleEditSubmit(movie.id)}>Save</button>
                  <button onClick={() => setEditingID(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <span>{movie.title}</span>
                  <button onClick={() => handleComplete(movie.id)}>
                    {movie.completed ? 'Undo Complete' : 'Complete'}
                  </button>
                  <button onClick={() => handleEdit(movie.id, movie.title)}>Edit</button>
                  <button onClick={() => handleDelete(movie.id)}>Delete</button>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="no-movies">No Movies Saved Yet!</p>
        )}
      </div>
    </div>
  );
};

export default Movies;