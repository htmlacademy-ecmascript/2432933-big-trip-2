import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { createFormEditTemplate } from './template-view/edit-form-template-view';
import { findByKey } from '../utils/utils';
import { configFlatpickr } from '../const';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class EditFormView extends AbstractStatefulView {
  #point = [];
  #destinations = [];
  #offersAll = [];
  //getOffersForType;
  #datepicker = null;

  constructor({ point, offers, destinations }) {
    super();
    this.#point = point;
    this.#offersAll = offers;
    this.#destinations = destinations;
    //this.getOffersForType = getOffersForType;

    this._setState(EditFormView.parsePointToState(this.#point));
    this._restoreHandlers();
  }

  get template() {
    return createFormEditTemplate(this._state, this.#offersAll, this.#destinations);
  }


  reset (point) {
    this.updateElement(
      EditFormView.parsePointToState(point),
    );
  }

  static parsePointToState = (point) => ({...point});

  static parseStateToPoint = (state) => ({...state});

  _restoreHandlers = () => {


    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);

    //this.element.querySelector('.event__save-btn').addEventListener('submit', this.#formSubmitHandler); // save

    this.#setDatepicker();
  };

  /*  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToTask(this._state));
  }; */

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedType = evt.target.value;

    this.updateElement({
      type: selectedType,
      offers: [],
    });

  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const newDestination = findByKey(this.#destinations, 'name', evt.target.value)?.id ?? {};
    this.updateElement({ destination: newDestination });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const price = Number(evt.target.value);

    if(price < 0){
      evt.target.value = 0;
      return;
    }

    this._setState({
      basePrice: price,
    });
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();

    const offerCheckbox = evt.target.classList.contains('event__offer-checkbox');
    if(!offerCheckbox){
      return;
    }

    const selectedOffers = new Set(this._state.offers);
    const offerId = evt.target.dataset.offer;
    const isChecked = evt.target.checked;

    if (isChecked) {
      selectedOffers.add(offerId);

    } else {
      selectedOffers.delete(offerId);
    }

    this._setState({ offers: Array.from(selectedOffers)});
  };

  #setDatepicker() {
    this.#datepicker = flatpickr(this.element.querySelector('#event-start-time-1'),
      {
        ...configFlatpickr,
        defaultDate : this._state.dateFrom,
        maxDate     : this._state.dateTo,
        onClose     : this.#dateFromCloseHandler,
      });

    this.#datepicker = flatpickr(this.element.querySelector('#event-end-time-1'),
      {
        ...configFlatpickr,
        defaultDate : this._state.dateTo,
        minDate     : this._state.dateFrom,
        onClose     : this.#dateToCloseHandler,
      });

  }

  #dateFromCloseHandler = ([userDate]) => {
    this.updateElement({
      dateFrom : userDate,
    });
  };

  #dateToCloseHandler = ([userDate]) => {
    this.updateElement({
      dateTo : userDate,
    });
  };

}
