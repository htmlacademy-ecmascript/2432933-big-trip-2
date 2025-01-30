import TripEventsListView from '../view/trip-events-list-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class ListPointsPresenter {
  #pointPresenter = null;
  #handleViewAction = null;
  #currentActiveFormId = null;

  constructor({ pointPresenter, handleViewAction }) {
    this.#pointPresenter = pointPresenter;
    this.#handleViewAction = handleViewAction;
  }

  init() {
    const listView = new TripEventsListView({
      handleFavorite      : this.#handleFavorite,
      handleOpenFormEdit  : this.#handleOpenFormEdit,
      handleCloseFormEdit : this.#handleCloseFormEdit,
    });
    //render(this.#listView, this.#container);
    listView.setClickListener();
  }

  #handleFavorite = (itemId) => {
    const pointPresenter = this.#pointPresenter.get(itemId);
    if (!pointPresenter) {
      return;
    }

    const updatedPoint = pointPresenter.toggleFavorite;
    this.#handleViewAction(UserAction.UPDATE_POINT, UpdateType.PATCH, updatedPoint);
  };

  #handleOpenFormEdit = (itemId) => {
    if (this.#currentActiveFormId !== null) {
      this.#handleCloseFormEdit(this.#currentActiveFormId);
    }
    const pointPresenter = this.#pointPresenter.get(itemId);
    if (!pointPresenter) {
      return;
    }

    pointPresenter.openEditMode(itemId);
    this.#currentActiveFormId = itemId;
    document.addEventListener('keydown', this.#handleCloseFormEditEscape);
  };

  #handleCloseFormEdit = (itemId) => {
    const pointPresenter = this.#pointPresenter.get(itemId);
    if (!pointPresenter) {
      return;
    }

    pointPresenter.reset();
    pointPresenter.closeEditMode();

    this.#currentActiveFormId = null;
    document.removeEventListener('keydown', this.#handleCloseFormEditEscape);
  };

  #handleCloseFormEditEscape = (event) => {
    if (event.key === 'Escape' && this.#currentActiveFormId !== null) {
      this.#handleCloseFormEdit(this.#currentActiveFormId);
    }
  };
}
