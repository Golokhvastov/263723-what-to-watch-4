import {reducer, ActionType, ActionCreator, Operation, ServerStatus} from "./data";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;

const api = createAPI(() => {});

const mocks = {
  movies: [
    {
      id: 11,
      posterImage: `test posterImage 1.jpg`,
      previewImage: `test previewImage 1.jpg`,
      backgroundImage: `test backgroundImage 1.jpg`,
      backgroundColor: `test backgroundColor 1.jpg`,
      isFavorite: false,
      descriptions: [
        `Test description 1-1`,
        `Test description 1-2`,
      ],
      director: `Test director 1`,
      genre: `Test genre 1`,
      preview: `Test preview 1`,
      rating: {
        score: 1.0,
        votes: 112
      },
      runTime: 113,
      src: `Test src 1`,
      starring: [
        `Test starring 1-1`,
        `Test starring 1-2`,
        `Test starring 1-3`,
        `Test starring 1-4`,
      ],
      title: `Test1`,
      year: 2001,
    },
  ],
  movie: {
    id: 21,
    posterImage: `test posterImage 2.jpg`,
    previewImage: `test previewImage 2.jpg`,
    backgroundImage: `test backgroundImage 2.jpg`,
    backgroundColor: `test backgroundColor 2.jpg`,
    isFavorite: false,
    descriptions: [
      `Test description 2-1`,
      `Test description 2-2`,
    ],
    director: `Test director 2`,
    genre: `Test genre 2`,
    preview: `Test preview 2`,
    rating: {
      score: 2.0,
      votes: 212
    },
    runTime: 213,
    src: `Test src 2`,
    starring: [
      `Test starring 2-1`,
      `Test starring 2-2`,
      `Test starring 2-3`,
      `Test starring 2-4`,
    ],
    title: `Test2`,
    year: 2002,
  },
  reviews: [
    {
      rating: 7.9,
      date: `December 10, 2010`,
      author: {
        name: `Test author 1`,
      },
      text: `Test text 1`
    },
    {
      rating: 8.0,
      date: `December 20, 2020`,
      author: {
        name: `Test author 2`,
      },
      text: `Test text 2`
    },
    {
      rating: 9.0,
      date: `December 30, 2030`,
      author: {
        name: `Test author 3`,
      },
      text: `Test text 3`
    }
  ]
};

const movieWithSameId = {
  id: 11,
  posterImage: `test posterImage 2.jpg`,
  previewImage: `test previewImage 2.jpg`,
  backgroundImage: `test backgroundImage 2.jpg`,
  backgroundColor: `test backgroundColor 2.jpg`,
  isFavorite: false,
  descriptions: [
    `Test description 2-1`,
    `Test description 2-2`,
  ],
  director: `Test director 2`,
  genre: `Test genre 2`,
  preview: `Test preview 2`,
  rating: {
    score: 2.0,
    votes: 212
  },
  runTime: 213,
  src: `Test src 2`,
  starring: [
    `Test starring 2-1`,
    `Test starring 2-2`,
    `Test starring 2-3`,
    `Test starring 2-4`,
  ],
  title: `Test2`,
  year: 2002,
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    serverStatus: ServerStatus.AVAILABLE,
    movies: [],
    promoMovie: null,
    favoriteMovies: [],
    reviewsForId: [],
  });
});

describe(`Reducer should change state by a given value`, () => {
  it(`serverStatus by a given value`, () => {
    expect(reducer({
      serverStatus: ServerStatus.AVAILABLE,
      movies: [],
      promoMovie: null,
      favoriteMovies: [],
      reviewsForId: [],
    }, {
      type: ActionType.SAVE_SERVER_STATUS,
      payload: ServerStatus.NOT_AVAILABLE,
    })).toEqual({
      serverStatus: ServerStatus.NOT_AVAILABLE,
      movies: [],
      promoMovie: null,
      favoriteMovies: [],
      reviewsForId: [],
    });

    expect(reducer({
      serverStatus: ServerStatus.AVAILABLE,
      movies: [],
      promoMovie: null,
      favoriteMovies: [],
      reviewsForId: [],
    }, {
      type: ActionType.SAVE_SERVER_STATUS,
      payload: ServerStatus.AVAILABLE,
    })).toEqual({
      serverStatus: ServerStatus.AVAILABLE,
      movies: [],
      promoMovie: null,
      favoriteMovies: [],
      reviewsForId: [],
    });
  });

  it(`movies by a given value`, () => {
    expect(reducer({
      serverStatus: ServerStatus.AVAILABLE,
      movies: [],
      promoMovie: null,
      favoriteMovies: [],
      reviewsForId: [],
    }, {
      type: ActionType.LOAD_MOVIES,
      payload: mocks.movies,
    })).toEqual({
      serverStatus: ServerStatus.AVAILABLE,
      movies: mocks.movies,
      promoMovie: null,
      favoriteMovies: [],
      reviewsForId: [],
    });
  });

  it(`promoMovie by a given value`, () => {
    expect(reducer({
      serverStatus: ServerStatus.AVAILABLE,
      movies: [],
      promoMovie: null,
      favoriteMovies: [],
      reviewsForId: [],
    }, {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: mocks.movies[0],
    })).toEqual({
      serverStatus: ServerStatus.AVAILABLE,
      movies: [],
      promoMovie: mocks.movies[0],
      favoriteMovies: [],
      reviewsForId: [],
    });
  });

  it(`favoriteMovies by a given value`, () => {
    expect(reducer({
      serverStatus: ServerStatus.AVAILABLE,
      movies: [],
      promoMovie: null,
      favoriteMovies: [],
      reviewsForId: [],
    }, {
      type: ActionType.LOAD_FAVORITE_MOVIES,
      payload: mocks.movies,
    })).toEqual({
      serverStatus: ServerStatus.AVAILABLE,
      movies: [],
      promoMovie: null,
      favoriteMovies: mocks.movies,
      reviewsForId: [],
    });
  });

  it(`reviewsForId by a given value`, () => {
    expect(reducer({
      serverStatus: ServerStatus.AVAILABLE,
      movies: [],
      promoMovie: null,
      favoriteMovies: [],
      reviewsForId: [],
    }, {
      type: ActionType.LOAD_REVIEWS_FOR_ID,
      payload: mocks.reviews,
    })).toEqual({
      serverStatus: ServerStatus.AVAILABLE,
      movies: [],
      promoMovie: null,
      favoriteMovies: [],
      reviewsForId: mocks.reviews,
    });
  });

  it(`one movie from movies by a given value`, () => {
    expect(reducer({
      serverStatus: ServerStatus.AVAILABLE,
      movies: mocks.movies,
      promoMovie: null,
      favoriteMovies: [],
      reviewsForId: [],
    }, {
      type: ActionType.CHANGE_FILM_IN_MOVIES,
      payload: movieWithSameId,
    })).toEqual({
      serverStatus: ServerStatus.AVAILABLE,
      movies: [movieWithSameId],
      promoMovie: null,
      favoriteMovies: [],
      reviewsForId: [],
    });
  });

  it(`ADD_FILM_IN_FAVORITE_MOVIES by a given value`, () => {
    expect(reducer({
      serverStatus: ServerStatus.AVAILABLE,
      movies: [],
      promoMovie: null,
      favoriteMovies: mocks.movies,
      reviewsForId: [],
    }, {
      type: ActionType.ADD_FILM_IN_FAVORITE_MOVIES,
      payload: mocks.movie,
    })).toEqual({
      serverStatus: ServerStatus.AVAILABLE,
      movies: [],
      promoMovie: null,
      favoriteMovies: [mocks.movies[0], mocks.movie],
      reviewsForId: [],
    });
  });

  it(`REMOVE_FILM_FROM_FAVORITE_MOVIES by a given value`, () => {
    expect(reducer({
      serverStatus: ServerStatus.AVAILABLE,
      movies: [],
      promoMovie: null,
      favoriteMovies: mocks.movies,
      reviewsForId: [],
    }, {
      type: ActionType.REMOVE_FILM_FROM_FAVORITE_MOVIES,
      payload: mocks.movies[0],
    })).toEqual({
      serverStatus: ServerStatus.AVAILABLE,
      movies: [],
      promoMovie: null,
      favoriteMovies: [],
      reviewsForId: [],
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for saveServerStatus returns correct action`, () => {
    expect(ActionCreator.saveServerStatus(ServerStatus.AVAILABLE)).toEqual({
      type: ActionType.SAVE_SERVER_STATUS,
      payload: ServerStatus.AVAILABLE,
    });

    expect(ActionCreator.saveServerStatus(ServerStatus.NOT_AVAILABLE)).toEqual({
      type: ActionType.SAVE_SERVER_STATUS,
      payload: ServerStatus.NOT_AVAILABLE,
    });
  });

  it(`Action creator for loadMovies returns correct action`, () => {
    expect(ActionCreator.loadMovies(mocks.movies)).toEqual({
      type: ActionType.LOAD_MOVIES,
      payload: mocks.movies,
    });
  });

  it(`Action creator for loadPromoMovie returns correct action`, () => {
    expect(ActionCreator.loadPromoMovie(mocks.movie)).toEqual({
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: mocks.movie,
    });
  });

  it(`Action creator for loadFavoriteMovies returns correct action`, () => {
    expect(ActionCreator.loadFavoriteMovies(mocks.movies)).toEqual({
      type: ActionType.LOAD_FAVORITE_MOVIES,
      payload: mocks.movies,
    });
  });

  it(`Action creator for loadReviewsForId returns correct action`, () => {
    expect(ActionCreator.loadReviewsForId(mocks.reviews)).toEqual({
      type: ActionType.LOAD_REVIEWS_FOR_ID,
      payload: mocks.reviews,
    });
  });

  it(`Action creator for changeFilmInMovies returns correct action`, () => {
    expect(ActionCreator.changeFilmInMovies(mocks.movie)).toEqual({
      type: ActionType.CHANGE_FILM_IN_MOVIES,
      payload: mocks.movie,
    });
  });

  it(`Action creator for addFilmInFavoriteMovies returns correct action`, () => {
    expect(ActionCreator.addFilmInFavoriteMovies(mocks.movie)).toEqual({
      type: ActionType.ADD_FILM_IN_FAVORITE_MOVIES,
      payload: mocks.movie,
    });
  });

  it(`Action creator for removeFilmFromFavoriteMovies returns correct action`, () => {
    expect(ActionCreator.removeFilmFromFavoriteMovies(mocks.movie)).toEqual({
      type: ActionType.REMOVE_FILM_FROM_FAVORITE_MOVIES,
      payload: mocks.movie,
    });
  });
});

describe(`Should make a correct API call`, () => {
  it(`loadMovies`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadMovies = Operation.loadMovies();

    apiMock.onGet(`/films`).reply(200, mocks.movies);

    return loadMovies(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_MOVIES,
        payload: mocks.movies
      });
    });
  });

  it(`loadPromoMovie`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadPromoMovie = Operation.loadPromoMovie();

    apiMock.onGet(`/films/promo`).reply(200, mocks.movie);

    return loadPromoMovie(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_PROMO_MOVIE,
        payload: mocks.movie
      });
    });
  });

  it(`loadFavoriteMovies`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadFavoriteMovies = Operation.loadFavoriteMovies();

    apiMock.onGet(`/favorite`).reply(200, mocks.movies);

    return loadFavoriteMovies(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_FAVORITE_MOVIES,
        payload: mocks.movies
      });
    });
  });

  it(`loadReviewsForId`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadReviewsForId = Operation.loadReviewsForId(1234);

    apiMock.onGet(`/comments/1234`).reply(200, mocks.reviews);

    return loadReviewsForId(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_REVIEWS_FOR_ID,
        payload: mocks.reviews
      });
    });
  });

  it(`addMovieToFavoriteMovies`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    let getState = () => {
      return {
        [NAME_SPACE]: {
          promoMovie: mocks.movie
        },
      };
    };
    const addMovieToFavoriteMovies = Operation.addMovieToFavoriteMovies(1234);

    apiMock.onPost(`/favorite/1234/1`).reply(200, mocks.movie);

    return addMovieToFavoriteMovies(dispatch, getState, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_FILM_IN_MOVIES,
        payload: mocks.movie
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.ADD_FILM_IN_FAVORITE_MOVIES,
        payload: mocks.movie
      });
    });
  });

  it(`addMovieToFavoriteMovies with change promoMovie`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    let getState = () => {
      return {
        [NAME_SPACE]: {
          promoMovie: mocks.movie
        },
      };
    };
    const addMovieToFavoriteMovies = Operation.addMovieToFavoriteMovies(21);

    apiMock.onPost(`/favorite/21/1`).reply(200, mocks.movie);

    return addMovieToFavoriteMovies(dispatch, getState, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_FILM_IN_MOVIES,
        payload: mocks.movie
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.ADD_FILM_IN_FAVORITE_MOVIES,
        payload: mocks.movie
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.LOAD_PROMO_MOVIE,
        payload: mocks.movie
      });
    });
  });

  it(`removeMovieFromFavoriteMovies`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    let getState = () => {
      return {
        [NAME_SPACE]: {
          promoMovie: mocks.movie
        },
      };
    };
    const removeMovieFromFavoriteMovies = Operation.removeMovieFromFavoriteMovies(1234);

    apiMock.onPost(`/favorite/1234/0`).reply(200, mocks.movie);

    return removeMovieFromFavoriteMovies(dispatch, getState, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_FILM_IN_MOVIES,
        payload: mocks.movie
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.REMOVE_FILM_FROM_FAVORITE_MOVIES,
        payload: mocks.movie
      });
    });
  });

  it(`removeMovieFromFavoriteMovies with change promoMovie`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    let getState = () => {
      return {
        [NAME_SPACE]: {
          promoMovie: mocks.movie
        },
      };
    };
    const removeMovieFromFavoriteMovies = Operation.removeMovieFromFavoriteMovies(21);

    apiMock.onPost(`/favorite/21/0`).reply(200, mocks.movie);

    return removeMovieFromFavoriteMovies(dispatch, getState, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_FILM_IN_MOVIES,
        payload: mocks.movie
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.REMOVE_FILM_FROM_FAVORITE_MOVIES,
        payload: mocks.movie
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.LOAD_PROMO_MOVIE,
        payload: mocks.movie
      });
    });
  });

  it(`postReview`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const commentData = {
      filmId: 1234,
      rating: 5.5,
      comment: `comment`,
    };
    const postReview = Operation.postReview(commentData, onSuccess, onError);

    apiMock.onPost(`/comments/1234`).reply(200, mocks.reviews[0]);

    return postReview(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(0);
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledTimes(0);
    })
    .catch(() => {
      expect(dispatch).toHaveBeenCalledTimes(0);
      expect(onSuccess).toHaveBeenCalledTimes(0);
      expect(onError).toHaveBeenCalledTimes(0);
    });
  });

  it(`postReview with error`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const commentData = {
      filmId: 1234,
      rating: 5.5,
      comment: `comment`,
    };
    const postReview = Operation.postReview(commentData, onSuccess, onError);

    apiMock.onPost(`/comments/1234`).reply(400);

    return postReview(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(0);
      expect(onSuccess).toHaveBeenCalledTimes(0);
      expect(onError).toHaveBeenCalledTimes(0);
    })
    .catch(() => {
      expect(dispatch).toHaveBeenCalledTimes(0);
      expect(onSuccess).toHaveBeenCalledTimes(0);
      expect(onError).toHaveBeenCalledTimes(1);
    });
  });
});
