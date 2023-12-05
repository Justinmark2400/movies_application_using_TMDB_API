import * as model from "./model.js";
import displayView from "./view/displayView.js";
import previewView from "./view/previewView.js";
import sidebarView from "./view/sidebarView.js";

const trendingMoviesEl = document.querySelector(".trending--movies");
const topRatedMoviesEl = document.querySelector(".top-rated--movies");
const upcomingMoviesEl = document.querySelector(".upcoming--movies");
const recommendationMoviesEl = document.querySelector(
  ".recommendation--movies"
);
const movieByGenre = document.querySelector(".movies-by-genre");
const displayMovies = document.querySelector(".main-container");
const preview = document.querySelector(".preview");
const allMovies = document.querySelector(".all-movies");
const mainContainer = document.querySelector(".main");
const mainResult = document.querySelector(".main-result");

const section = document.querySelectorAll(".main-section");

// Functions

const moviesGenre = async function () {
  await model.getGenresNames();
  sidebarView.renderMarkup(model.state.genres.results);
};

const controlerDisplayMovie = async function () {
  await model.getNowPlaying();

  await model.getDisplayMovieInfo(model.state.nowPlaying[0].movieId);
  displayView.renderPosterMarkup(model.state.nowPlaying);
  displayView.renderDisplayMovie(model.state.movieInfo);
  await model.getPopularMovies();
  displayView.renderSlides(model.state.popular.results, trendingMoviesEl);
  await model.getTopRatedMovies();
  displayView.renderSlides(model.state.topRated.results, topRatedMoviesEl);
  await model.getUpcomingMovies();
  displayView.renderSlides(model.state.upcoming.results, upcomingMoviesEl);
};

const handlerDisplayMovie = async function (el) {
  await model.getDisplayMovieInfo(el.dataset.movieid);
  displayView.renderDisplayMovie(model.state.movieInfo);
  displayView.updateActiveSlide(el);
};

const handlerDisplayPreview = async function (el) {
  console.log(el);
  section.forEach((el) => el.classList.add("hidden"));
  preview.classList.remove("hidden");
  await model.getMoviePreview(el.dataset.movieid);
  await model.getRecommendations(el.dataset.movieid);
  previewView.renderMarkup(model.state.moviePreview);
  previewView.renderSlides(
    model.state.recommendations.results,
    recommendationMoviesEl
  );
};

const handlerHome = async function () {
  section.forEach((el) => el.classList.add("hidden"));
  displayMovies.classList.remove("hidden");
  await controlerDisplayMovie();
};
const handlerGenre = async function (id, genre) {
  await model.getMoviesByGenre(id);
  section.forEach((el) => el.classList.add("hidden"));
  allMovies.classList.remove("hidden");

  sidebarView.renderMovieByGenre(
    genre,
    model.state.genres.results,
    movieByGenre
  );
};
const handlerShowMore = async function () {
  console.log(23);
};
// Init
const handlerInit = function () {
  displayView.addHanderlDisplayMovieDetail(handlerDisplayMovie);
  displayView.addHandlerHome(handlerHome);
  displayView.addHandlerWatchNow(handlerDisplayPreview);
  displayView.addHandlerShowMore(handlerShowMore);
  previewView.addHandelPreview(handlerDisplayPreview);
  sidebarView.addHandlerGenre(handlerGenre);
};
const init = function () {
  moviesGenre();
  controlerDisplayMovie();
};

handlerInit();
init();
