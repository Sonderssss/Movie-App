import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

function App() {
  //usestate for getting movies
  const [movies, setMovies] = useState([]);

  //udestate for seaarching a movie
  //search term is what the user inputs in the field
  //setsearchterm takes that input
  const [searchTerm, setSearchTerm] = useState("");

  const APIURL = "http://www.omdbapi.com/?apikey=457c265c"; //api ulr that gives me all the movie data

  //search function with api
  const searchMovies = async (title) => {
    //uses backtick not quotaion marks
    const response = await fetch(`${APIURL}&s=${title}`);
    const data = await response.json(); //getting the details in json format

    setMovies(data.Search); //gives us access to our movies
  };

  //renders all movies with title spiderman when page is up at the start
  useEffect(() => {
    searchMovies("all");
  }, []);

  return (
    <div className="app">
      <h1>MOVIELAND</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
