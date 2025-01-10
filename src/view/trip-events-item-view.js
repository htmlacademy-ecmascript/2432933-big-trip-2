import AbstractView from '../framework/view/abstract-view.js';
import { getDiffDate, getEventDate } from '../utils/formatDate.js';

const createEventOfferTemplate = (offer) => {
  const { title, price} = offer;
  return `<li class="event__offer">
                <span class="event__offer-title">${title}</span> &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
              </li>`;
};

const createOffersTemplate = (point, offers) => {
  const filteredOffers = offers.filter((offer) => point.offers.includes(offer.id));

  return filteredOffers.map((offer) => createEventOfferTemplate(offer)).join('');
};

const createEventsItemTemplate = (point, offers, destinations) =>{
  const { type, basePrice, isFavorite, dateFrom, dateTo } = point;

  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';
  const offersItemTemplate = createOffersTemplate(point, offers);

  const dateFromMonthDay = getEventDate(dateFrom, 'MMM D');
  const dateFromHours = getEventDate(dateFrom, 'HH:mm');
  const dateToHours = getEventDate(dateTo, 'HH:mm');
  const diffDate = getDiffDate(dateFrom, dateTo);

  return (
    `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateFrom}">${dateFromMonthDay}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destinations.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${dateFromHours}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTo}">${dateToHours}</time>
                  </p>
                  <p class="event__duration">${diffDate}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers"> ${offersItemTemplate} </ul>
                <button class="event__favorite-btn  ${favoriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button"  data-id="${point.id}" data-action='item'>
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`
  );

};

export default class TripEventsItemView extends AbstractView {
  #points = [];
  #offers = [];
  #destination = {};

  constructor({ points, offers, destination }) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destination = destination;
  }

  get template() {
    return createEventsItemTemplate(this.#points, this.#offers , this.#destination);
  }

}
