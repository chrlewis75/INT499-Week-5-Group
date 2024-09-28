const API_KEY = '36c5a59d270942dcafdb4c8e5eaa5cf2'; // TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3'; // URL for the movie database

// Function to fetch popular movies
export const fetchPopularMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`); // API request
        if (!response.ok) { // Error handling to know if the connection was successful to the API
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data.results; // Return a list of popular movies
    } catch (error) { // Error handling if there are issues with the network
        console.error('Error fetching data:', error);
        return [];
    }
};