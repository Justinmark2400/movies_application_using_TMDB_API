import { getJSON } from "./helper.js";
import { API_KEY } from "./config.js";
export const state = {
  nowPlaying: [],
  movieInfo: {},
  popular: {
    pageNo: 1,
    totalPage: 1,
    results: [],
  },
  topRated: {
    pageNo: 1,
    totalPage: 1,
    results: [],
  },
  upcoming: {
    pageNo: 1,
    totalPage: 1,
    results: [],
  },
  recommendations: {
    pageNo: 1,
    totalPage: 1,
    results: [],
  },
  moviePreview: {
    movieInfo: {},
    crewInfo: [],
    trailer: [],
  },
  genres: {
    pageNo: 1,
    totalPage: 1,
    results: [],
  },
};

export const getNowPlaying = async function () {
  try {
    const data = await getJSON(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
    );

    data.results.forEach((res) => {
      state.nowPlaying.push({
        movieId: res.id,
        posterPath: res.poster_path,
      });
    });
  } catch (err) {
    console.error(err.message, " ✅");
  }
};

const initMoviesSlide = function (slides) {
  const res = [];
  slides.forEach((data) => {
    res.push({
      posterPath: data.poster_path,
      movieId: data.id,
      title: data.title,
      rating: data.vote_average.toFixed(1),
      releaseDate: new Date(data.release_date).getFullYear(),
    });
  });
  return res;
};
export const getPopularMovies = async function (pageNo = 1) {
  try {
    const data = await getJSON(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNo}`
    );

    console.log(data, " popularMovies");
    state.popular.pageNo = pageNo;

    state.popular.results = initMoviesSlide(data.results);
  } catch (err) {
    console.error(err.message);
  }
};
export const getTopRatedMovies = async function (pageNo = 1) {
  try {
    const data = await getJSON(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${pageNo}`
    );

    state.topRated.results = initMoviesSlide(data.results);
  } catch (err) {
    console.error(err.message);
  }
};
export const getUpcomingMovies = async function (pageNo = 1) {
  try {
    const data = await getJSON(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${pageNo}`
    );
    state.upcoming.results = initMoviesSlide(data.results);
  } catch (err) {
    console.error(err.message);
  }
};

export const getRecommendations = async function (movieId, pageNo = 1) {
  try {
    const data = await getJSON(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&page=${pageNo}`
    );
    state.recommendations.results = initMoviesSlide(data.results);
  } catch (err) {
    console.error(err.message);
  }
};

export const getMoviePreview = async function (movieId) {
  try {
    state.moviePreview.movieInfo = await getMovieDetail(movieId);
    state.moviePreview.crewInfo = await getCrewName(movieId);
    state.moviePreview.trailer = await getTrailers(movieId);
    console.log(state.moviePreview);
  } catch (err) {
    console.error(err.message);
  }
};
const getCrewName = async function (movieId) {
  try {
    const data = await getJSON(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`
    );
    console.log(data, " 😭 crew");
    const starring = [];

    data.credits.cast.forEach((n, i) => {
      if (i >= 20) return;
      starring.push(n.name);
    });
    const director = data.credits.crew.find((n) => n.job === "Director");

    return [director.name, starring.join(", ")];
  } catch (err) {
    console.error(err.message);
  }
};
const getTrailers = async function (movieId) {
  try {
    const data = await getJSON(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`
    );
    console.log(data, " 😭 trailer");

    const key = [];
    data.videos.results.forEach((vid, i) => {
      if (i >= 10) return;
      key.push(vid.key);
    });

    return key;
  } catch (err) {
    console.error(err.message);
  }
};

export const getDisplayMovieInfo = async function (movieId) {
  try {
    state.movieInfo = await getMovieDetail(movieId);
  } catch (err) {
    console.error(err.message);
  }
};

const getMovieDetail = async function (movieId) {
  try {
    const data = await getJSON(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=release_dates`
    );
    console.log(data);
    return {
      movieId: data.id,
      posterPath: data.poster_path,
      backdropPath: data.backdrop_path,
      title: data.title,
      releaseDate: new Date(data.release_date).getFullYear(),
      rating: data.vote_average.toFixed(1),
      overview: data.overview,
      runtime: data.runtime,
      getCertification() {
        const certification = data.release_dates.results.find(
          (country) => country.iso_3166_1 === "US"
        );
        return (
          certification?.release_dates[0]?.certification ||
          certification?.release_dates[1]?.certification ||
          ""
        );
      },
      getGenres() {
        const genresArr = [];
        data.genres.forEach((g) => {
          genresArr.push(g.name);
        });
        return genresArr.join(", ");
      },
    };
  } catch (err) {
    console.error(err.message, " ✅");
  }
};

export const getMoviesByGenre = async function (id, pageNo = 1) {
  try {
    const data = await getJSON(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${pageNo}&with_genres=${id}`
    );
    state.genres.results = initMoviesSlide(data.results);
    console.log(state.genres);
  } catch (err) {
    console.error(err.message);
  }
};

export const getGenresNames = async function () {
  try {
    const data = await getJSON(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    data.genres.forEach((genre) => {
      state.genres.results.push(genre);
    });
  } catch (err) {
    console.error(err.message);
  }
};
