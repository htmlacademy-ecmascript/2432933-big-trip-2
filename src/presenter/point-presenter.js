import TripEventsItemView from '../view/trip-events-item-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace, remove } from '../framework/render.js';

export default class PointPresenter {
  #itemComponent = null;
  #editComponent = null;
  //#point = null;
  #offers = null;
  #point = null;
  #destinations = null;

  constructor({container, offers, destinations,}) {
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
      offers : this.#offers,
      destination : this.#destinations,
    });

    this.#editComponent = new EditFormView({
      points : this.#point,
      offers : this.#offers,
      destination : this.#destinations,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#itemComponent, this.container);
      return;
    }

    replace(this.#itemComponent, prevPointComponent);
    console.log('init', this.#point);

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  update(point, offers, destination) {
    console.log('update in POINTPRESENTER', point);
    this.init(point, offers, destination);
  }


  get toggleFavorite() {
    console.log('toggleFavorite');
    return {
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    };
  }

  toggleEditMode() {
    replace(this.#editComponent, this.#itemComponent);
  }

  destroy() {
    if (this.#itemComponent) {
      remove(this.#itemComponent);
    }
  }

}

