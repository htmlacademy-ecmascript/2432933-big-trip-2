import TripEventsItemView from '../view/trip-events-item-view.js';
import TripEventsList from '../view/trip-events-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace, remove } from '../framework/render.js';

export default class EventPointsPresenter {
  #currentPointId = null;
  #itemComponent = null;
  #editComponent = null;
  #eventList = null;
  #pointsComponents = new Map();

  constructor(points, offers, destination, container) {
    this.points = points;
    this.offers = offers;
    this.destination = destination;
    this.container = container;
  }

  init(point) {
    this.#createEventPointComponents(point);
  }

  #createEventPointComponents(point) {
    this.test = point;
    const eventOffers = this.offers.find((offer) => offer.type === point.type)?.offers || [];
    const eventDestination = this.destination.find((destination) => destination.id === point.destination) || {};

    this.#itemComponent = new TripEventsItemView({
      points : this.test,
      offers : eventOffers,
      destination : eventDestination,
    });

    this.#editComponent = new EditFormView({
      points : this.test,
      offers : eventOffers,
      destination : eventDestination,
    });

    this.#renderComponent(point.id);
    this.#pointsComponents.set(point.id, { item : this.#itemComponent, edit : this.#editComponent });

  }

  #renderComponent(pointId) {
    const existingElement = this.#pointsComponents.get(pointId)?.item.element;

    if (existingElement && existingElement.parentNode) {
      existingElement.parentNode.replaceChild(this.#itemComponent.element, existingElement);
    } else {
      render(this.#itemComponent, this.container);
    }
  }

  initEventList() {
    this.#eventList = new TripEventsList({
      handleEditClick : (id) => this.#handleEditClick(id),
      handleCloseForm : (id) => this.#handleCloseForm(id),
      handleFavorite  : (id) => this.#handleFavorite(id),
    });
    this.#eventList.setClickListener();
  }

  #handleEditClick = (pointId) => {
    if (this.#currentPointId !== null && this.#currentPointId !== pointId) {
      this.#handleCloseForm(this.#currentPointId);
    }

    if (this.#pointsComponents.has(pointId)) {
      const { item, edit } = this.#pointsComponents.get(pointId);
      replace(edit, item);
      this.#currentPointId = pointId;

      document.addEventListener('keydown', this.#handleCloseFormEscape);
    }
  };

  #handleCloseForm = (pointId) => {
    if (this.#pointsComponents.has(pointId)) {
      const { item, edit } = this.#pointsComponents.get(pointId);
      replace(item, edit);
      this.#currentPointId = null;
      document.removeEventListener('keydown', this.#handleCloseFormEscape);
    }
  };

  #handleCloseFormEscape = (event) => {
    if (event.key === 'Escape'){
      if(this.#currentPointId !== null) {
        this.#handleCloseForm(this.#currentPointId);
      }
    }
  };

  #handleFavorite = (pointId) => {
    if (this.#pointsComponents.has(pointId)) {
      const currentPoint = this.points.find((point) => point.id === pointId);
      const updatedPoint = { ...currentPoint, isFavorite: !currentPoint.isFavorite };

      this.points = this.points.map((point) => point.id === pointId ? updatedPoint : point);
      this.#createEventPointComponents(updatedPoint);
    }
  };

  destroy() {
    this.#pointsComponents.forEach(({ item, edit }) => {
      remove(item);
      remove(edit);
    });
    this.#pointsComponents.clear();
  }

}

