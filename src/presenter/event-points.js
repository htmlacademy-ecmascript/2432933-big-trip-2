import TripEventsItem from '../view/trip-events-item.js';
import TripEventsList from '../view/trip-events-list.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace } from '../framework/render.js';
import {eventsContainerElement} from '../const.js'; // позже уберу

export default class EventPoints {
  #eventList = null;
  #currentPointId = null;
  #itemsMap = new Map();
  container = eventsContainerElement;

  constructor(points, offers, destinations){
    this.points = points;
    this.offers = offers;
    this.destinations = destinations;
  }

  init(){
    this.#initEventList();
    this.#renderItem();
  }

  #renderItem() {
    this.points.forEach((point) => {
      const eventOffers = this.offers.find((offer) => offer.type === point.type)?.offers || [];
      const eventDestination = this.destinations.find((destination) => destination.id === point.destination) || [];

      const item = new TripEventsItem({
        points: point,
        offers : eventOffers,
        destinations: eventDestination,
      });

      const edit = new EditFormView({
        points: point,
        offers : eventOffers,
        destinations: eventDestination,
      });

      this.#itemsMap.set(point.id, { item, edit });
      render(item, this.#eventList.element);
    });
  }

  #initEventList() {
    this.#eventList = new TripEventsList({
      handleEditClick : this.#handleEditClick.bind(this),
      handleCloseForm : this.#handleCloseForm.bind(this)
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
