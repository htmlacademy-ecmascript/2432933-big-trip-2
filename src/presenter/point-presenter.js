import TripEventsItemView from '../view/trip-events-item-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace, remove } from '../framework/render.js';
import { UserAction, UpdateType, Mode } from '../const.js';

export default class PointPresenter {
  #container = null;
  #itemComponent = null;
  #editComponent = null;
  #point = null;
  #offers = [];
  #destinations = [];
  #mode = Mode.DEFAULT;
  #handleDataChange = null;

  constructor({ container, offers, destinations, onDataChange }) {
    this.#container = container;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
  }

  get toggleFavorite() {
    return { ...this.#point, isFavorite: !this.#point.isFavorite };
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#itemComponent;
    const prevPointEditComponent = this.#editComponent;

    this.#itemComponent = new TripEventsItemView({
      point        : this.#point,
      offers       : this.#offers,
      destinations : this.#destinations,
    });

    this.#editComponent = new EditFormView({
      point             : this.#point,
      offers            : this.#offers,
      destinations      : this.#destinations,
      onDeleteClick     : this.#handleDeleteClick,
      onFormSubmitClick : this.#handleFormSubmitClick,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#itemComponent, this.#container.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#itemComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDIT) {
      replace(this.#editComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  openEditMode() {
    replace(this.#editComponent, this.#itemComponent);
    this.#mode = Mode.EDIT;
  }

  closeEditMode() {
    replace(this.#itemComponent, this.#editComponent);
    this.#mode = Mode.DEFAULT;
  }

  destroy() {
    remove(this.#itemComponent);
    remove(this.#editComponent);
  }

  reset() {
    this.#editComponent.reset(this.#point);
  }

  setSaving() {
    if (this.#mode !== Mode.EDIT) {
      return;
    }

    this.#editComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setDeleting() {
    if (this.#mode !== Mode.EDIT) {
      return;
    }

    this.#editComponent.updateElement({
      isDisabled: true,
      isDeleting: true,
    });
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#itemComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editComponent.shake(resetFormState);
  }

  #handleDeleteClick = (update) => {
    this.#handleDataChange(UserAction.DELETE_POINT, UpdateType.MINOR, update);
  };

  #handleFormSubmitClick = (updatedPoint) => {
    this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, updatedPoint);
  };
}
