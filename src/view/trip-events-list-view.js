import { eventsListElement } from '../elements';


export default class TripEventsListView {
  constructor({ handleOpenFormEdit, handleCloseFormEdit, handleFavorite }) {
    this.handleOpenFormEdit = handleOpenFormEdit;
    this.handleCloseFormEdit = handleCloseFormEdit;
    this.handleFavorite = handleFavorite;
    //eventsListElement.addEventListener('click', this.#handleClick);
  }

  setClickListener() {
    eventsListElement.addEventListener('click', this.#handleClick);
  }

  #handleClick = (event) => {
    const item = event.target.closest('.trip-events__item');
    if (!item) {
      return;
    }

    const itemId = item.dataset.item;
    const favorite = event.target.closest('.event__favorite-btn');
    const openFormEdit = event.target.classList.contains('event__rollup-btn-item');
    const closeFormEdit = event.target.classList.contains('event__rollup-btn-edit');

    if (openFormEdit) {
      this.handleOpenFormEdit(itemId);
      return;
    }

    if (favorite) {
      this.handleFavorite(itemId);
    }

    if (closeFormEdit) {
      this.handleCloseFormEdit(itemId);
    }

  };
}

