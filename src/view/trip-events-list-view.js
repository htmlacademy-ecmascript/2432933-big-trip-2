import AbstractView from '../framework/view/abstract-view';

const createPointsListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripEventsListView extends AbstractView {
  constructor({ onOpenFormEditClick, onCloseFormEditClick, onFavoriteClick }) {
    super();
    this.handleOpenFormEditClick = onOpenFormEditClick;
    this.handleCloseFormEditClick = onCloseFormEditClick;
    this.handleFavoriteClick = onFavoriteClick;
  }

  get template() {
    return createPointsListTemplate();
  }

  setClickListener() {
    this.element.addEventListener('click', this.#onListItemClick);
  }

  #onListItemClick = (event) => {
    const item = event.target.closest('.trip-events__item');
    if (!item) {
      return;
    }

    const itemId = item.dataset.item;
    const favorite = event.target.closest('.event__favorite-btn');
    const openFormEdit = event.target.classList.contains('event__rollup-btn-item');
    const closeFormEdit = event.target.classList.contains('event__rollup-btn-edit');

    if (openFormEdit) {
      this.handleOpenFormEditClick(itemId);
      return;
    }

    if (favorite) {
      this.handleFavoriteClick(itemId);
    }

    if (closeFormEdit) {
      this.handleCloseFormEditClick(itemId);
    }
  };
}

