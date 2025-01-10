import TripEventsItemView from '../view/trip-events-item-view.js';
import TripEventsList from '../view/trip-events-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace } from '../framework/render.js';

export default class EventPointsPresenter {
  #eventList = null;
  #currentPointId = null;
  #itemsMap = new Map();

  constructor(points, offers, destination, container){
    this.points = points;
    this.offers = offers;
    this.destination = destination;
    this.container = container;
  }

  init(){
    this.#initEventList();
    this.#renderEventPoints();
  }

  #renderEventPoints() {
    this.points.forEach((point) => {
      const eventOffers = this.offers.find((offer) => offer.type === point.type)?.offers || [];
      const eventDestination = this.destination.find((destination) => destination.id === point.destination) || {};

      const item = new TripEventsItemView({
        points: point,
        offers : eventOffers,
        destination: eventDestination,
      });

      const edit = new EditFormView({
        points: point,
        offers : eventOffers,
        destination: eventDestination,
      });

      this.#itemsMap.set(point.id, { item, edit });
      render(item, this.#eventList.element);
    });
  }

  #initEventList() {
    this.#eventList = new TripEventsList({
      handleEditClick : (pointId) => this.#handleEditClick(pointId),
      handleCloseForm : (pointId) => this.#handleCloseForm(pointId)
    });
    render(this.#eventList, this.container);
    this.#eventList.setClickListener();
  }


  #handleEditClick = (pointId) => {
    if (this.#itemsMap.has(pointId)) {
      const { item, edit } = this.#itemsMap.get(pointId);
      replace(edit, item);
      this.#currentPointId = pointId;

      document.addEventListener('keydown', this.#handleCloseFormEscape);
    }
  };

  #handleCloseForm = (pointId) => {
    if (this.#itemsMap.has(pointId)) {
      const { item, edit } = this.#itemsMap.get(pointId);
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

}
