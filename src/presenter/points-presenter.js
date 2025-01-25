import TripEventsItemView from '../view/trip-events-item-view.js';
//import TripEventsList from '../view/trip-events-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace, remove } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';

export default class PointsPresenter {
  #itemComponent = null;
  #editComponent = null;
  #handleDataChange = null;
  point = null;

  constructor({container, onDataChange}) {
    this.container = container;
    this.#handleDataChange = onDataChange;
  }

  init(point, eventOffers, eventDestination) {
    this.point = point;

    const prevPointComponent = this.#itemComponent;
    const prevPointEditComponent = this.#editComponent;
    this.#itemComponent = new TripEventsItemView({
      point : this.point,
      offers : eventOffers,
      destination : eventDestination,
    });

    this.#editComponent = new EditFormView({
      points : this.point,
      offers : eventOffers,
      destination : eventDestination,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#itemComponent, this.container);
      return;
    }
    replace(this.#itemComponent, prevPointComponent);
    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  update(point, offers, destination) {
    this.init(point, offers, destination);
  }

  toggleFavorite() {
    this.#handleDataChange(UserAction.UPDATE_TASK, UpdateType.MINOR, {
      ...this.point,
      isFavorite: !this.point.isFavorite,
    });
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

