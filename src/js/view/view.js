export class View {
  renderSlides(data, parenEl) {
    let markup = "";
    data.forEach((res) => {
      markup += `
      <div class="movies-slide" data-movieid="${res.movieId}">
      <div class="movie-img-container">
        <img
          class="movie-poster"
          src="https://image.tmdb.org/t/p/original${res.posterPath}"
          alt=""
        />
      </div>
      <p class="movie-name">${res.title}</p>
      <div class="movie-info">
        <p class="movie-rating">
          <i class="ph-fill ph-star"></i>${res.rating}
        </p>
        <p class="movie-release-date">${res.releaseDate}</p>
      </div>
    </div>
      `;
    });

    this._clear(parenEl);
    parenEl.insertAdjacentHTML("beforeend", markup);
  }

  _clear(el) {
    el.innerHTML = "";
  }
  renderMessage() {}
  renderError() {}
}
