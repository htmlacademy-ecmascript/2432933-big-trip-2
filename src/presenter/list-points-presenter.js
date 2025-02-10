import TripEventsListView from '../view/trip-events-list-view.js';
import { render } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';

export default class ListPointsPresenter {
  #pointPresenter = null;
  #handleViewAction = null;
  #currentActiveFormId = null;
  #manageFormMode = null;
  #container = null;

  constructor({ container, pointPresenter, handleViewAction, manageFormMode }) {
    this.#container = container;
    this.#pointPresenter = pointPresenter;
    this.#handleViewAction = handleViewAction;
    this.#manageFormMode = manageFormMode;
  }

  init() {
    const tripEventsListView = new TripEventsListView({
      onFavoriteClick      : this.#handleFavoriteClick,
      onOpenFormEditClick  : this.#handleOpenFormEditClick,
      onCloseFormEditClick : this.#handleCloseFormEditClick,
    });
    render(tripEventsListView, this.#container);
    tripEventsListView.setClickListener();
    return tripEventsListView;
  }

  resetCurrentActiveFormId = () => {
    this.#currentActiveFormId = null;
  };

  #handleFavoriteClick = (itemId) => {
    const pointPresenter = this.#pointPresenter.get(itemId);
    if (!pointPresenter) {
      return;
    }

    const updatedPoint = pointPresenter.toggleFavorite;
    this.#handleViewAction(UserAction.UPDATE_POINT, UpdateType.PATCH, updatedPoint);
  };

  #handleOpenFormEditClick = (itemId) => {
    if (this.#currentActiveFormId !== null) {
      this.#handleCloseFormEditClick(this.#currentActiveFormId);
    }

    const pointPresenter = this.#pointPresenter.get(itemId);
    if (!pointPresenter) {
      return;
    }
    pointPresenter.openEditMode(itemId);

    this.#currentActiveFormId = itemId;
    this.#manageFormMode();
    document.addEventListener('keydown', this.#onEscapeCloseClick);
  };

  #handleCloseFormEditClick = (itemId) => {
    const pointPresenter = this.#pointPresenter.get(itemId);
    if (!pointPresenter) {
      return;
    }

    pointPresenter.reset();
    pointPresenter.closeEditMode();

    this.#currentActiveFormId = null;
    document.removeEventListener('keydown', this.#onEscapeCloseClick);
  };

  #onEscapeCloseClick = (event) => {
    if (event.key === 'Escape' && this.#currentActiveFormId !== null) {
      this.#handleCloseFormEditClick(this.#currentActiveFormId);
    }
  };

}
