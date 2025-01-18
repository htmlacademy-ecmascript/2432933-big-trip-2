import AbstractView from '../framework/view/abstract-view';
import { getMockOffers} from '../mock/offers';
import { getMockDestinations } from '../mock/destinations';
import { getArraysByType, getUppercaseWords } from '../utils/utils';
import { getEventDate } from '../utils/formatDate';

const pointCities = getArraysByType(getMockDestinations(), 'name');
const pointTypes = getArraysByType(getMockOffers(), 'type');

const createTypesEventTemplate = () => (
  pointTypes.map((type)=> `<div class="event__type-item">
<input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
<label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${getUppercaseWords(type)}</label>
</div> `).join('')
);

const createCitiesTemplate = () => pointCities.map((city) => `<option value="${city}"></option>`).join('');

const createOffersSelectorTemplate = (offers, isChecked) => {
  const { id, title, price } = offers;

  return `
    <div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" id="offer-${id}" type="checkbox" name="event-offer-${id}" ${isChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="offer-${id}">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
        </label>
    </div>
`;
};

const createOffersSectionTemplate = (point, offers) => {
  const offersSelector = offers.map((offer) => createOffersSelectorTemplate(offer, point.offers.includes(offer.id))).join('');

  return offersSelector ?
    `
    <section class="event__section event__section--offers">
        <h3 class="event__section-title event__section-title--offers"> Offers</h3>
        <div class="event__available-offers">
            ${offersSelector}
        </div>
    </section>
`
    : '';
};

const createGroupTimeTemplate = (dateFrom, dateTo) => {
  const format = 'DD/MM/YY HH:mm';
  const dateFromFormat = getEventDate(dateFrom, format);
  const dateToFormat = getEventDate(dateTo, format);

  return `
  <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromFormat}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToFormat}">
    </div>
  `;
};

const createDescriptionSectionTemplate = (destinations) => {
  const { description, pictures = [] } = destinations;

  const picturesDestinations = pictures.map((picture) => (
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}" loading="lazy">
`)).join('');

  return picturesDestinations.length > 0 ? `
  <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
          <div class="event__photos-tape">
             ${picturesDestinations}
          </div>
      </div>
  </section>` : '';
};

const createFormEditTemplate = (point, offers, destinations) => {
  const { type, basePrice, dateFrom, dateTo } = point;

  const typesEventTemplate = createTypesEventTemplate();
  const citiesTemplate = createCitiesTemplate();

  const offersTemplate = createOffersSectionTemplate(point, offers);

  const destinationsTemplate = createDescriptionSectionTemplate(destinations);
  const timeTemplate = createGroupTimeTemplate(dateFrom, dateTo);

  return (
    `<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${typesEventTemplate}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinations.name}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${citiesTemplate}
       </datalist>
    </div>

             ${timeTemplate}
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details"> ${offersTemplate} ${destinationsTemplate} </section>
</form>
</li>
  `);
};

export default class EditFormView extends AbstractView{
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
    return createFormEditTemplate(this.#points, this.#offers , this.#destination);
  }
}
