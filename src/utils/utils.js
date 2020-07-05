export const getTextRating = (value) => {
  if (value >= 0 && value < 3) {
    return `Bad`;
  } else if (value >= 3 && value < 5) {
    return `Normal`;
  } else if (value >= 5 && value < 8) {
    return `Good`;
  } else if (value >= 8 && value <= 10) {
    return `Very good`;
  }

  return ``;
};

export const getSimilarMovies = (movies, selectedMovie, maxSimilarMovies) => {
  const allSimilarMovies = movies.filter((movie) => movie.genre === selectedMovie.genre);
  return allSimilarMovies.slice(0, maxSimilarMovies);
};
