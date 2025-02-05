import TripEventsItemView from '../view/trip-events-item-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace, remove } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import { eventsListElement } from '../elements.js';

const Mode = {
  DEFAULT: 'default',
  EDIT: 'edit'
};

export default class PointPresenter {
  #itemComponent = null;
  #editComponent = null;
  #point = null;
  #offers = null;
  #destinations = null;
  #mode = Mode.DEFAULT;
  #handleDataChange = null;

  constructor({ offers, destinations, onDataChange, }) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#itemComponent;
    const prevPointEditComponent = this.#editComponent;

    this.#itemComponent = new TripEventsItemView({
      point : this.#point,
      offers : this.#offers,
      destinations : this.#destinations,
    });

    this.#editComponent = new EditFormView({
      point         : this.#point,
      offers        : this.#offers,
      destinations  : this.#destinations,
      onDeleteClick : this.#handleDeleteClick,
      onFormSubmit  : this.handleFormSubmit,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#itemComponent, eventsListElement);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#itemComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDIT){
      replace(this.#editComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  #handleDeleteClick = (update) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      update,
    );
  };

  get toggleFavorite() {
    return {
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    };
  }

  openEditMode() {
    replace(this.#editComponent, this.#itemComponent);
    this.#mode = Mode.EDIT;
  }


  closeEditMode() {
    replace(this.#itemComponent, this.#editComponent);
    this.#mode = Mode.DEFAULT;
  }

  get isMode(){
    return this.#mode;
  }

  destroy() {
    remove(this.#itemComponent);
    remove(this.#editComponent);
  }

  reset() {
    this.#editComponent.reset(this.#point);
  }


  handleFormSubmit = (updatedPoint) => {
    this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, updatedPoint);
    this.closeEditMode();
  };
}
