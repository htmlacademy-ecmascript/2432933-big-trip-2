import TripEventsItemView from '../view/trip-events-item-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace, remove } from '../framework/render.js';

export default class PointPresenter {
  #itemComponent = null;
  #editComponent = null;
  #point = null;
  #offers = null;
  #destinations = null;

  constructor({ container, offers, destinations }) {
    this.container = container;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#itemComponent;
    const prevPointEditComponent = this.#editComponent;

    this.#itemComponent = new TripEventsItemView({
      point : this.#point,
      offers: this.#offers,
      destinations : this.#destinations,
    });

    this.#editComponent = new EditFormView({
      point : this.#point,
      offers: this.#offers,
      destinations : this.#destinations,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#itemComponent, this.container);
      return;
    }

    replace(this.#itemComponent, prevPointComponent);
    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }


  get toggleFavorite() {
    return {
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    };
  }

  openEditMode() {
    replace(this.#editComponent, this.#itemComponent);
  }


  closeEditMode() {
    this.currentPointId = null;
    replace(this.#itemComponent, this.#editComponent);

  }

  destroy() {
    remove(this.#itemComponent);
    remove(this.#editComponent);
  }

  reset () {
    this.#editComponent.reset(this.#point);
  }
}
