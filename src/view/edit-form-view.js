import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { createFormEditTemplate } from './template-view/edit-form-template-view';
import { findByKey } from '../utils/utils';
import { configFlatpickr, BLANK_POINT } from '../const';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class EditFormView extends AbstractStatefulView {
  #point = [];
  #destinations = [];
  #offersAll = [];

  #dateFromPicker = null;
  #dateToPicker = null;

  #handleDeleteClick = null;
  #handleFormSubmit = null;
  #isNewPoint = false;

  constructor({ point = BLANK_POINT, offers, destinations, onDeleteClick, onFormSubmit, isNewPoint }) {
    super();
    this.#point = point;
    this.#offersAll = offers;
    this.#destinations = destinations;
    this.#isNewPoint = isNewPoint;

    this.#handleDeleteClick = onDeleteClick;
    this.#handleFormSubmit = onFormSubmit;

    this._setState(EditFormView.parsePointToState(this.#point));
    this._restoreHandlers();
  }

  get template() {
    return createFormEditTemplate(this._state, this.#offersAll, this.#destinations, this.#isNewPoint);
  }

  reset (point) {
    this.updateElement(EditFormView.parsePointToState(point));
  }

  static parsePointToState = (point) => {
    const isSubmitDisabled = !point.destination || point.dateFrom === null || point.dateTo === null;
    return {
      ...point,
      isSubmitDisabled,
      isSaving   : false,
      isDeleting : false,
      isDisabled : false
    };

  };

  static parseStateToPoint = (state) => {
    const point = {...state};

    delete point.isSubmitDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    delete point.isDisabled;
    return point;

  };

  _restoreHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    const listOffers = this.element.querySelector('.event__available-offers');
    if(listOffers !== null){
      listOffers.addEventListener('change', this.#offersChangeHandler);
    }

    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#pointDeleteClickHandler);
    this.#setDatepicker();
  };


  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToPoint(this._state));
  };


  #pointDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditFormView.parseStateToPoint(this._state));
  };

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
    this.#dateFromPicker = flatpickr(this.element.querySelector('#event-start-time-1'),
      {
        ...configFlatpickr,
        defaultDate : this._state.dateFrom,
        maxDate     : this._state.dateTo,
        onClose     : this.#dateFromCloseHandler,
      });

    this.#dateToPicker = flatpickr(this.element.querySelector('#event-end-time-1'),
      {
        ...configFlatpickr,
        defaultDate : this._state.dateTo,
        minDate     : this._state.dateFrom,
        onClose     : this.#dateToCloseHandler,
      });

  }

  #dateFromCloseHandler = ([userDate]) => {
    this.#dateToPicker.set('minDate', this._state.dateFrom);
    this.updateElement({
      dateFrom : userDate,
    });
  };

  #dateToCloseHandler = ([userDate]) => {
    this.#dateFromPicker.set('maxDate', this._state.dateTo);
    this.updateElement({
      dateTo : userDate,
    });
  };

  removeElement = () =>{
    super.removeElement();
    if (this.#dateFromPicker !== null) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if (this.#dateToPicker !== null) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  };
}
