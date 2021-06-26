import logo from "./logo.svg";
import { React, useEffect, useState } from "react";
import "./App.css";
import Movie from "../src/components/Movie";

const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [Movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetch(APIURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);
  
  const submithandler = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetch(SEARCHAPI + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMovies(data.results);
        });
        setSearchTerm('')
    }
  };
  
  const onChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <>
      <header>
        <form onSubmit={submithandler}>
          <input
            type="search"
            className="search"
            placeholder="search"
            value={searchTerm}
            onChange={onChangeHandler}
          />
        </form>
      </header>
      <div className="movieContainer">
        {Movies.length > 0 &&
          Movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
