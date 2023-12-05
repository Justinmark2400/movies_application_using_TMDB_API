import { View } from "./view.js";

class DisplayView extends View {
  _parentEl = document.querySelector(".secondary-header");
  renderPosterMarkup(data) {
    const parentEl = document.querySelector(".header--movies-slides");
    let markup = "";
    data.forEach(
      (res, i) =>
        (markup += `
      <div class="header--movies-slide" data-movieId="${res.movieId}">
          <img
              src="https://image.tmdb.org/t/p/original${res.posterPath}"
              alt=""
              class=${i === 0 ? "header--movies-slide--active" : ""}
          />
      </div>
      `)
    );

    this._clear(parentEl);
    parentEl.insertAdjacentHTML("beforeend", markup);
  }
  renderDisplayMovie(data) {
    const parentEl = document.querySelector(".header-movie-info");
    const movieBG = document.querySelector(".header--movie-display");
    const markup = `
            <h2 class="header-movie-name">${data.title}</h2>
              <div class="header-movie-details">
                <p class="header-movie-year">${data.releaseDate}</p>
                <p class="header-movie-rating">${data.rating}</p>
              </div>
            <p class="header-movie-genre">${data.getGenres()}</p>
            <p class="header-movie-overview">
            ${data.overview}
            </p>
            <button class="watch-now-btn" data-movieid="${data.movieId}">
              <i class="ph ph-play-circle"></i> Watch Now
            </button>
    `;
    movieBG.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${data.backdropPath}')`;

    this._clear(parentEl);
    parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  addHanderlDisplayMovieDetail(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const target = e.target.closest(".header--movies-slide");
      if (!target) return;
      handler(target);
    });
  }
  addHandlerWatchNow(handler) {
    document
      .querySelector(".main-container")
      .addEventListener("click", function (e) {
        const target = e.target.closest(".watch-now-btn");
        if (!target) return;
        handler(target);
      });
  }
  addHandlerHome(handler) {
    document
      .querySelector(".website-name")
      .addEventListener("click", function (e) {
        handler();
      });
  }
  addHandlerShowMore(handler) {
    document.querySelectorAll(".btn-show").forEach((el) => {
      el.addEventListener("click", function (e) {
        const target = e.target.closest(".btn-show");
        if (!target) return;
        console.log(target, " 🥳");
        handler(target);
      });
    });
  }

  updateActiveSlide(el) {
    const slides = document.querySelectorAll(".header--movies-slide > img");
    slides.forEach((slide) =>
      slide.classList.remove("header--movies-slide--active")
    );
    el.querySelector("img").classList.add("header--movies-slide--active");
  }
}

export default new DisplayView();
