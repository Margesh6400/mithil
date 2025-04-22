import axios from 'axios';

// Mock data for development
const mockMovies = {
  1: {
    id: 1,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    rating: "9.0",
    duration: "2h 32min",
    genre: "Action, Crime, Drama",
    releaseDate: "2008",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    language: "English",
    subtitle: "Multiple Languages",
    poster: "https://picsum.photos/seed/darkknight/400/600",
    trailerUrl: "https://youtu.be/kmJLuwP3MbY"
  },
  2: {
    id: 2,
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    rating: "8.8",
    duration: "2h 28min",
    genre: "Sci-Fi, Action",
    releaseDate: "2010",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    language: "English",
    subtitle: "Multiple Languages",
    poster: "https://picsum.photos/seed/inception/400/600",
    trailerUrl: "https://youtu.be/YoHD9XEInc0"
  },
  3: {
    id: 3,
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    rating: "8.9",
    duration: "2h 34min",
    genre: "Crime, Drama",
    releaseDate: "1994",
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    language: "English",
    subtitle: "Multiple Languages",
    poster: "https://picsum.photos/seed/pulp/400/600",
    trailerUrl: "https://youtu.be/s7EdQ4FqbhY"
  },
  4: {
    id: 4,
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    rating: "9.2",
    duration: "2h 55min",
    genre: "Crime, Drama",
    releaseDate: "1972",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    language: "English",
    subtitle: "Multiple Languages",
    poster: "https://picsum.photos/seed/godfather/400/600",
    trailerUrl: "https://youtu.be/sY1S34973zA"
  },
  5: {
    id: 5,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: "8.6",
    duration: "2h 49min",
    genre: "Sci-Fi, Adventure",
    releaseDate: "2014",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    language: "English",
    subtitle: "Multiple Languages",
    poster: "https://picsum.photos/seed/interstellar/400/600",
    trailerUrl: "https://youtu.be/zSWdZVtXT7E"
  },
  6: {
    id: 6,
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    rating: "8.7",
    duration: "2h 16min",
    genre: "Sci-Fi, Action",
    releaseDate: "1999",
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    language: "English",
    subtitle: "Multiple Languages",
    poster: "https://picsum.photos/seed/matrix/400/600",
    trailerUrl: "https://youtu.be/vKQi3bBA1y8"
  }
};

const movieApi = axios.create({
  baseURL: '/api/movies',
});

export const getMovies = () => movieApi.get('/');

// Mock the getMovieDetails response for development
export const getMovieDetails = async (id) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const movieId = parseInt(id);
  if (mockMovies[movieId]) {
    return { data: mockMovies[movieId] };
  }
  
  throw new Error('Movie not found');
};

export default movieApi;