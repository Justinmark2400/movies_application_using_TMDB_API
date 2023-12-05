import { View } from "./view.js";

class PreviewView extends View {
  _parentEl = document.querySelector(".preview-container");
  renderMarkup(data) {
    console.log(data, " ✅");
    const markup = `
            <!-- <div class="preview-poster"> -->
            <img src="https://image.tmdb.org/t/p/original${
              data.movieInfo.posterPath
            }" alt="" class="preview-img" />
            <!-- </div> -->
            <div class="movie-preview">
              <div class="preview-info">
                <h3 class="header-movie-name">${data.movieInfo.title}</h3>
                <ul class="preview-details">
                  <li class="preview-rating gray-text">
                    <i class="ph-fill ph-star"></i>${data.movieInfo.rating}
                  </li>
                  <li class="preview-runtime gray-text"><span>${
                    data.movieInfo.runtime
                  }</span>m</li>
                  <li class="preview-year gray-text">${
                    data.movieInfo.releaseDate
                  }</li>
                  <li class="preview-rated">${data.movieInfo.getCertification()}</li>
                </ul>
                <p class="preview-genres gray-text">${data.movieInfo.getGenres()}
                </p>
                <p class="preview-overview text">${data.movieInfo.overview}
                </p>
                <div class="preview-cast">
                  <p class="gray-text">Starring</p>
                  <p class="cast-name text">${data.crewInfo[1]}
                  </p>
                </div>
                <div class="preview-director">
                  <p class="gray-text">Directed By</p>
                  <p class="diretor-name text">${data.crewInfo[0]}</p>
                </div>
              </div>
              <h3 class="text trailer-A-clips-heading">Trailers And Clips</h3>            
              <div class="trailers">
              ${this.renderTrailerMarkup(data.trailer)}
              </div>
            </div>
    
    `;
    document.querySelector(".preview").style.backgroundImage = `url(
      https://image.tmdb.org/t/p/original${data.movieInfo.posterPath}
    )`;
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }
  renderTrailerMarkup(data) {
    let markup = "";
    data.forEach((trailer) => {
      markup += `
                 <div class="trailer">
                  <iframe
                    src="https://www.youtube.com/embed/${trailer}"
                  ></iframe>
                </div>
      `;
    });
    return markup;
  }
  addHandelPreview(handler) {
    document.body.addEventListener("click", function (e) {
      const target = e.target.closest(".movies-slide");
      if (!target) return;
      handler(target);
    });
  }
}

export default new PreviewView();
