import BaseView from '../render.js';
import { findByKey} from '../utils/utils.js';
import { getDiffDate, getEventDate } from '../utils/formatDate.js';

const createItemOfferTemplate = (offer) => {
  const { title, price} = offer;
  return `<li class="event__offer">
                <span class="event__offer-title">${title}</span> &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
              </li>`;
};

const createOffersTemplate = (mockPoint, mockOffers) => {
  const pointTypeOffer = findByKey(mockOffers, 'type', mockPoint.type) || { offers: [] };
  const pointeOfferKey = new Set(mockPoint.offers);

  return pointTypeOffer.offers
    .filter((offer) => pointeOfferKey.has(offer.id))
    .map((offer) => createItemOfferTemplate(offer))
    .join('');

};

const createEventsTemplate = (points, offers, destinations) =>{
  const { type, basePrice, isFavorite, destination, dateFrom, dateTo } = points;

  const questCoincidence = findByKey(destinations, 'id', destination) || '';

  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';
  const offersItem = createOffersTemplate(points, offers);

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
                <h3 class="event__title">${type} ${questCoincidence.name}</h3>
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
                <ul class="event__selected-offers"> ${offersItem} </ul>
                <button class="event__favorite-btn  ${favoriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`
  );

};

export default class TripEventsItem extends BaseView {
  constructor({ point, offers, destinations}) {
    super();
    this.point = point;
    this.offers = offers;
    this.destinations = destinations;
  }

  get template() {
    return createEventsTemplate(this.point, this.offers, this.destinations);
  }
}


