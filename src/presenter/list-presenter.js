import TripEventsListView from '../view/trip-events-list-view.js';
import { render, replace, remove } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
export default class ListPresenter {
  #listView = null;
  #container = null;
  #pointPresenter = null; // Хранилище всех презентеров
  #handleViewAction = null; // Функция для обработки действий
  #currentActiveFormId = null;

  constructor({ pointPresenter, handleViewAction }) {

    this.#pointPresenter = pointPresenter;
    this.#handleViewAction = handleViewAction;
  }

  init() {
    this.#listView = new TripEventsListView({
      handleFavorite: this.#handleFavorite,
      handleEditClick: this.#handleOpenFormEdit,
      handleCloseForm: this.#handleCloseFormEdit,
    });
    //render(this.#listView, this.#container);
  }

  #handleFavorite = (itemId) => {
    const pointPresenter = this.#pointPresenter.get(itemId);
    if (!pointPresenter) {
      return;
    }
    console.log('handleFavorite');
    const updatedPoint = pointPresenter.toggleFavorite;
    this.#handleViewAction(UserAction.UPDATE_POINT, UpdateType.PATCH, updatedPoint);
  };

  #handleOpenFormEdit = (itemId) => {
    if (this.#currentActiveFormId !== null) {
      this.#closeForm(this.#currentActiveFormId);
    }
    const pointPresenter = this.#pointPresenter.get(itemId);
    if (!pointPresenter) {
      return;
    }
    pointPresenter.toggleEditMode(itemId);
    this.#currentActiveFormId = itemId;
  };

  #handleCloseFormEdit = (itemId) => {
    const pointPresenter = this.#pointPresenter.get(itemId);
    if (!pointPresenter) {
      return;
    }
    console.log('closeForm');
    pointPresenter.closeEditMode(itemId);
    this.#currentActiveFormId = null;
  };

  #closeForm(itemId) {
    const pointPresenter = this.#pointPresenter.get(itemId);
    if (!pointPresenter) {
      return;
    }
    pointPresenter.closeEditMode(itemId);
    this.#currentActiveFormId = null;
  }
}
