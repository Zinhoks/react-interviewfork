import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { movies$ } from "./movies";
import ProgressBar from "./ProgressBar";

import "./movies.css";

const App = () => {
  const movies = useSelector((state) => state.movies);
  const NumberOfCardPerPages = 4;
  const currentPage = useSelector((state) => state.currentPage);

  const dispatch = useDispatch();

  useEffect(() => {
    movies$.then((movies) => dispatch({ type: "SET_MOVIES", payload: movies }));
  }, []);

  const deleteMovie = (id) => {
    dispatch({ type: "REMOVE_MOVIE", payload: id });
  };

  const toggleLikeDislike = (id) => {
    dispatch({ type: "TOGGLE_LIKE_DISLIKE", payload: id });
  };

  // detrmine quel films doivent etre affiche sur la page
  const indexOfLastCard = currentPage * NumberOfCardPerPages;
  // console.log(indexOfLastCard)
  const indexOfFirstCard = indexOfLastCard - NumberOfCardPerPages;
  // console.log(indexOfFirstCard)
  const currentCards = movies.slice(indexOfFirstCard, indexOfLastCard);
  // console.log(currentCards)

  const handlePageChange = (newPage) => {
    dispatch({ type: "CHANGE_PAGE", payload: newPage });
    console.log();
  };

  return (
    <div className="cards-container">
      <div className="card-container">
        {currentCards.map((movie) => (
          <div className="card" key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Category: {movie.category}</p>
            <p>
              Likes: {movie.likes} Dislikes: {movie.dislikes}
            </p>
<p> Ratio

</p>
            <ProgressBar likes={movie.likes} dislikes={movie.dislikes} />

            <button className="btndelete" onClick={() => deleteMovie(movie.id)}>Delete</button>
            <button className="btnlike" onClick={() => toggleLikeDislike(movie.id)}>
              {movie.liked ? "Dislike" : movie.disliked ? "Dislike" : "Like"}
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button className="btnpage"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button className="btnpage"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(movies.length / NumberOfCardPerPages)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
