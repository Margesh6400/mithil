import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Calendar, Film, Play, Heart, Clock, ChevronRight, Filter, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import VideoModal from '../components/common/VideoModal';

const Home = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [filters, setFilters] = useState({
    genre: '',
    rating: '',
    year: ''
  });

  const genres = ["All", "Action", "Drama", "Sci-Fi", "Crime", "Adventure", "Fantasy", "Animation", "Biography", "Western"];
  const ratings = ["All", "9+", "8+", "7+"];
  const years = ["All", "2020s", "2010s", "2000s", "1990s", "1980s", "Pre-1980"];

  const genreColors = {
    Action: 'bg-red-500',
    Drama: 'bg-blue-500',
    'Sci-Fi': 'bg-purple-500',
    Crime: 'bg-yellow-500',
    Adventure: 'bg-green-500',
    Fantasy: 'bg-indigo-500',
    Animation: 'bg-pink-500',
    Biography: 'bg-orange-500',
    Western: 'bg-amber-500',
    Romance: 'bg-rose-500',
    History: 'bg-cyan-500',
    War: 'bg-emerald-500',
    Horror: 'bg-violet-500',
    Mystery: 'bg-fuchsia-500',
    Thriller: 'bg-lime-500'
  };

  const movieData = [
    {
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
      image: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      trailerUrl: "https://youtu.be/kmJLuwP3MbY"
    },
    {
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
      image: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
      poster: "https://image.tmdb.org/t/p/w500/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
      trailerUrl: "https://youtu.be/YoHD9XEInc0"
    },
    {
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
      image: "https://image.tmdb.org/t/p/original/tbVZ3Sq88dZaCANlUcewQuHQOaE.jpg",
      poster: "https://image.tmdb.org/t/p/w500/tbVZ3Sq88dZaCANlUcewQuHQOaE.jpg",
      trailerUrl: "https://youtu.be/s7EdQ4FqbhY"
    },
    {
      id: 4,
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      rating: "9.3",
      duration: "2h 22min",
      genre: "Drama",
      releaseDate: "1994",
      director: "Frank Darabont",
      cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
      language: "English",
      subtitle: "Multiple Languages",
      image: "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      trailerUrl: "https://youtu.be/6hB3S9bIaco"
    },
    {
      id: 5,
      title: "Schindler's List",
      description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
      rating: "9.0",
      duration: "3h 15min",
      genre: "Biography, Drama, History",
      releaseDate: "1993",
      director: "Steven Spielberg",
      cast: ["Liam Neeson", "Ben Kingsley", "Ralph Fiennes"],
      language: "English",
      subtitle: "Multiple Languages",
      image: "https://image.tmdb.org/t/p/original/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
      poster: "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
      trailerUrl: "https://youtu.be/gG22XNhtnoY"
    },
    {
      id: 6,
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
      image: "https://image.tmdb.org/t/p/original/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg",
      poster: "https://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg",
      trailerUrl: "https://youtu.be/sY1S34973zA"
    },
    {
      id: 7,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      rating: "8.6",
      duration: "2h 49min",
      genre: "Adventure, Drama, Sci-Fi",
      releaseDate: "2014",
      director: "Christopher Nolan",
      cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
      language: "English",
      subtitle: "Multiple Languages",
      image: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      trailerUrl: "https://youtu.be/zSWdZVtXT7E"
    },
    {
      id: 8,
      title: "Fight Club",
      description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
      rating: "8.8",
      duration: "2h 19min",
      genre: "Drama",
      releaseDate: "1999",
      director: "David Fincher",
      cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
      language: "English",
      subtitle: "Multiple Languages",
      image: "https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      trailerUrl: "https://youtu.be/SUXWAEX2jlg"
    },
    {
      id: 9,
      title: "Forrest Gump",
      description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
      rating: "8.8",
      duration: "2h 22min",
      genre: "Drama, Romance",
      releaseDate: "1994",
      director: "Robert Zemeckis",
      cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
      language: "English",
      subtitle: "Multiple Languages",
      image: "https://image.tmdb.org/t/p/original/7c9UVPPiTPltouxRVY6N9uugaVA.jpg",
      poster: "https://image.tmdb.org/t/p/w500/7c9UVPPiTPltouxRVY6N9uugaVA.jpg",
      trailerUrl: "https://youtu.be/bLvqoHBptjg"
    },
    {
      id: 10,
      title: "The Matrix",
      description: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
      rating: "8.7",
      duration: "2h 16min",
      genre: "Action, Sci-Fi",
      releaseDate: "1999",
      director: "Lana Wachowski, Lilly Wachowski",
      cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
      language: "English",
      subtitle: "Multiple Languages",
      image: "https://image.tmdb.org/t/p/original/vybQQ7w7vGvF53IsGD0y0JSgIsA.jpg",
      poster: "https://image.tmdb.org/t/p/w500/vybQQ7w7vGvF53IsGD0y0JSgIsA.jpg",
      trailerUrl: "https://youtu.be/vKQi3bBA1y8"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleWatchTrailer = (trailerUrl) => {
    setSelectedTrailer(trailerUrl);
    setIsModalOpen(true);
  };

  const filteredMovies = movieData.filter(movie => {
    if (filters.genre && filters.genre !== 'All' && !movie.genre.includes(filters.genre)) return false;
    if (filters.rating === '9+' && parseFloat(movie.rating) < 9) return false;
    if (filters.rating === '8+' && parseFloat(movie.rating) < 8) return false;
    if (filters.rating === '7+' && parseFloat(movie.rating) < 7) return false;
    if (filters.year && filters.year !== 'All') {
      const movieYear = parseInt(movie.releaseDate);
      if (filters.year === '2020s' && (movieYear < 2020)) return false;
      if (filters.year === '2010s' && (movieYear < 2010 || movieYear >= 2020)) return false;
      if (filters.year === '2000s' && (movieYear < 2000 || movieYear >= 2010)) return false;
      if (filters.year === '1990s' && (movieYear < 1990 || movieYear >= 2000)) return false;
      if (filters.year === '1980s' && (movieYear < 1980 || movieYear >= 1990)) return false;
      if (filters.year === 'Pre-1980' && movieYear >= 1980) return false;
    }
    return true;
  });

  const FilterButton = ({ options, current, onChange, label }) => (
    <div className="relative">
      <select
        value={current}
        onChange={(e) => onChange(e.target.value)}
        className="w-40 px-4 py-2.5 text-sm bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer transition-colors hover:bg-gray-50"
      >
        <option value="">{label}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <Filter className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 pointer-events-none right-3 top-1/2" />
    </div>
  );

  const heroContent = {
    title: "Cinema Reimagined",
    tagline: "Experience the Magic of Movies",
    description: "Step into a world of extraordinary storytelling, breathtaking visuals, and unforgettable moments. Your cinematic journey begins here.",
    backgroundImage: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg" // The Dark Knight backdrop
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5
      }
    },
    exit: { opacity: 0 }
  };

  const heroTextVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const loadingVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      scale: 1.2,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const ringVariants = {
    animate: {
      rotate: 360,
      scale: [1, 1.1, 1],
      transition: {
        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
        scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
      }
    }
  };

  if (isLoading) {
    return (
      <motion.div 
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-40 h-40"
          variants={loadingVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Animated rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-2 border-blue-500/30 rounded-full"
              variants={ringVariants}
              animate="animate"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}

          {/* Logo container */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-full shadow-lg"
            animate={{
              boxShadow: [
                "0 0 20px rgba(37, 99, 235, 0.2)",
                "0 0 40px rgba(37, 99, 235, 0.4)",
                "0 0 20px rgba(37, 99, 235, 0.2)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Film className="w-16 h-16 text-white" />
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 space-y-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h1 
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
          >
            CineVerse
          </motion.h1>
          <motion.div
            className="text-sm text-blue-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading your experience...
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gray-100"
    >
      <Header />
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={selectedTrailer}
      />
      
      {/* Enhanced Hero Section */}
      <motion.div 
        className="relative flex items-center justify-center h-screen overflow-hidden"
        style={{ y }}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img
            src={heroContent.backgroundImage}
            alt="Hero Background"
            className="object-cover w-full h-full"
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>

        <motion.div 
          className="relative z-10 px-4 text-center text-white"
          variants={heroTextVariants}
        >
          <motion.h1 
            className="mb-6 font-bold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-white via-white to-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {heroContent.title}
          </motion.h1>
          
          <motion.p 
            className="max-w-2xl mx-auto mb-12 text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {heroContent.description}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Trailers
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex items-center px-8 py-4 text-lg font-semibold bg-white rounded-full text-slate-900"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Now
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Filter Section */}
      <motion.div 
        className="sticky top-0 z-20 px-6 py-4 shadow-lg bg-white/80 backdrop-blur-lg"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-wrap items-center justify-center gap-6 mx-auto max-w-7xl">
          <FilterButton 
            options={genres}
            current={filters.genre}
            onChange={(value) => setFilters(prev => ({ ...prev, genre: value }))}
            label="Genre"
          />
          <FilterButton 
            options={ratings}
            current={filters.rating}
            onChange={(value) => setFilters(prev => ({ ...prev, rating: value }))}
            label="Rating"
          />
          <FilterButton 
            options={years}
            current={filters.year}
            onChange={(value) => setFilters(prev => ({ ...prev, year: value }))}
            label="Year"
          />
        </div>
      </motion.div>

      {/* Now Playing Section */}
      <motion.section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="flex items-center justify-between mb-8"
            variants={item}
          >
            <h2 className="text-3xl font-bold text-gray-800">Now Playing</h2>
            <motion.button
              className="flex items-center text-blue-600"
              whileHover={{ x: 5 }}
            >
              View All <ChevronRight className="w-5 h-5 ml-1" />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredMovies.map((movie, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden transition-shadow duration-300 bg-white shadow-lg group rounded-2xl hover:shadow-xl"
                variants={item}
                whileHover={{ y: -5 }}
                layout
              >
                <div className="relative">
                  <div className="relative pb-[56.25%] overflow-hidden">
                    <img 
                      src={movie.image}
                      alt={movie.title}
                      className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:opacity-100" />
                  </div>
                  
                  <div className="absolute flex flex-wrap gap-2 top-4 left-4">
                    {movie.genre.split(', ').map((genre) => (
                      <span 
                        key={genre} 
                        className={`px-3 py-1 text-xs font-medium text-white rounded-full ${genreColors[genre] || 'bg-gray-500'} shadow-lg`}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <motion.button
                      onClick={() => handleWatchTrailer(movie.trailerUrl)}
                      className="flex items-center px-6 py-3 text-white transition-colors bg-blue-600 rounded-full shadow-lg hover:bg-blue-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Watch Trailer
                    </motion.button>
                    <Link
                      to={`/book/${movie.id}`}
                      className="flex items-center px-6 py-3 text-white transition-colors bg-green-600 rounded-full shadow-lg hover:bg-green-700"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Tickets
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{movie.title}</h3>
                    <motion.button
                      className="text-red-500 hover:text-red-600"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className="w-6 h-6" />
                    </motion.button>
                  </div>
                  <p className="mb-4 text-sm text-gray-600 line-clamp-2">{movie.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center font-medium text-yellow-500">
                        <Star className="w-5 h-5 mr-1 fill-current" />
                        {movie.rating}
                      </span>
                      <span className="flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {movie.duration}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{movie.releaseDate}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Coming Soon Section */}
      <motion.section 
        className="px-6 py-16 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto text-center max-w-7xl">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">Coming Soon</h2>
          <p className="mb-8 text-gray-600">Get notified when new movies arrive</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-6 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:w-auto"
            />
            <motion.button
              className="px-8 py-3 font-semibold text-white bg-blue-600 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Notify Me
            </motion.button>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;