import { createStore } from "redux";

const initialState = {
  movies: [],
  currentPage: 1,
};

function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.payload,
      };
    case "REMOVE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
      };

    case "TOGGLE_LIKE_DISLIKE":
      return {
        ...state,
        movies: state.movies.map((movie) => {
          if (movie.id === action.payload) {
            if (movie.liked) {
              return {
                ...movie,
                liked: false,
                dislikes: movie.dislikes + 1,
                likes: movie.likes - 1,
              };
            } else {
              return {
                ...movie,
                liked: true,
                likes: movie.likes + 1,
                dislikes: movie.dislikes - 1,
              };
            }
          }
          return movie;
        }),
      };

    case "CHANGE_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
}

export const store = createStore(moviesReducer);
