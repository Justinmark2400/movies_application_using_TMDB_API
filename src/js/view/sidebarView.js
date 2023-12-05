import { View } from "./view.js";

class SideBarView extends View {
  _parentEl = document.querySelector(".genre");
  renderMarkup(data) {
    let markup = "";
    console.log(data);
    data.forEach((g) => {
      markup += `
        <li class="genre-name" data-id=${g.id} >${g.name}</li>
    `;
    });
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }
  addHandlerGenre(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const target = e.target.closest("li");
      if (!target) return;
      console.log(target);
      handler(target.dataset.id, target.innerHTML);
    });
  }
  renderMovieByGenre(genre, data, parentEl) {
    console.log(genre, data, parentEl);
    document.querySelector(".genre---name").textContent = `ALL ${genre} Movies`;
    this.renderSlides(data, parentEl);
  }
}

export default new SideBarView();
